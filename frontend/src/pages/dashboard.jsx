import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Modal, Form, Alert, Table } from 'react-bootstrap';
import Navibar from '../components/Navbar';
import styles from './dashboard.module.css';
import { companyData as allCompanyDataList } from '../assets/companyData.js';

const companyDetailsMap = new Map(allCompanyDataList.map(company => [String(company.id), company]));

function Dashboard() {
    const [userData, setUserData] = useState(null);
    const [userTransactions, setUserTransactions] = useState([]);
    const [stockHoldings, setStockHoldings] = useState([]);

    const [pageError, setPageError] = useState(null);
    const [transactionError, setTransactionError] = useState(null);

    const [loadingUserData, setLoadingUserData] = useState(true);
    const [loadingTransactions, setLoadingTransactions] = useState(false);

    const [showSellModal, setShowSellModal] = useState(false);
    const [selectedStockForSell, setSelectedStockForSell] = useState(null);
    const [sellQuantity, setSellQuantity] = useState('');
    const [sellError, setSellError] = useState('');
    const [sellSuccess, setSellSuccess] = useState('');

    const uid = localStorage.getItem('uid');
    const token = localStorage.getItem('token');

    const getCompanyName = (companyId) => {
        const company = companyDetailsMap.get(String(companyId));
        return company ? company.companyName : 'Unknown Company';
    };

    const processStockHoldings = useCallback((transactions) => {
        if (!transactions || transactions.length === 0) {
            setStockHoldings([]);
            return;
        }
        const holdings = {};
        transactions.forEach(transaction => {
            // Assuming transaction.quantity from API is positive for BUY and negative for SELL
            const effectiveQuantity = parseFloat(transaction.quantity);
            const companyIdStr = String(transaction.companyId);
            holdings[companyIdStr] = (holdings[companyIdStr] || 0) + effectiveQuantity;
        });

        const holdingsArray = Object.entries(holdings)
            .map(([companyId, quantity]) => {
                const companyDetail = companyDetailsMap.get(companyId);
                return {
                    companyId,
                    quantity, // This quantity will be the net quantity (can be positive)
                    companyName: companyDetail ? companyDetail.companyName : 'Unknown Company',
                    currentPrice: companyDetail ? parseFloat(companyDetail.stockPrice) : 0
                };
            })
            .filter(holding => holding.quantity > 0); // Only show stocks with a positive net quantity

        setStockHoldings(holdingsArray);
    }, []);

    const fetchUserDataAndTransactions = useCallback(async () => {
        if (!token || !uid) {
            setPageError("No token or user ID found. Please log in.");
            setLoadingUserData(false);
            setLoadingTransactions(false);
            return;
        }

        setLoadingUserData(true);
        setLoadingTransactions(true);
        setPageError(null);
        setTransactionError(null);
        setUserData(null);
        setUserTransactions([]);
        setStockHoldings([]);

        try {
            const userResponse = await axios.get(`http://localhost:3001/api/user/${uid}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserData(userResponse.data);

            try {
                const transactionsResponse = await axios.get(`http://localhost:3001/api/transactions`, {
                    params: { userId: uid },
                    headers: { Authorization: `Bearer ${token}` }
                });
                const transactions = transactionsResponse.data.Transaction || [];
                setUserTransactions(transactions.sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date)));
                processStockHoldings(transactions);
            } catch (transErr) {
                console.error("Error fetching transactions:", transErr);
                const errMsg = transErr.response ? (transErr.response.data.error || "Error fetching transactions") : "Error fetching transactions";
                setTransactionError(errMsg + (transErr.response?.status === 401 ? " (Unauthorized - please check login)" : ""));
                setUserTransactions([]);
                setStockHoldings([]);
            }

        } catch (userErr) {
            console.error("Error fetching user data:", userErr);
            const errMsgUser = userErr.response ? (userErr.response.data.error || "Error fetching user data") : "Error fetching user data";
            setPageError(errMsgUser + (userErr.response?.status === 401 ? " (Unauthorized - please check login)" : ""));
            setUserData(null);
        } finally {
            setLoadingUserData(false);
            setLoadingTransactions(false);
        }
    }, [token, uid, processStockHoldings]);

    useEffect(() => {
        fetchUserDataAndTransactions();
    }, [fetchUserDataAndTransactions]);

    const handleShowSellModal = (stock) => {
        setSelectedStockForSell(stock);
        setSellQuantity('');
        setSellError('');
        setSellSuccess('');
        setShowSellModal(true);
    };

    const handleCloseSellModal = () => {
        setShowSellModal(false);
        setSelectedStockForSell(null);
        setSellError('');
        setSellSuccess('');
    };

    const handleSellQuantityChange = (e) => {
        setSellQuantity(e.target.value);
        setSellError('');
    };

    const handleConfirmSell = async () => {
        if (!selectedStockForSell || !uid) {
            setSellError("Error: No stock selected or user not identified.");
            return;
        }
        const quantityToSell = parseInt(sellQuantity, 10);
        if (isNaN(quantityToSell) || quantityToSell <= 0) {
            setSellError("Please enter a valid quantity greater than 0.");
            return;
        }
        if (quantityToSell > selectedStockForSell.quantity) {
            setSellError(`You can only sell up to ${selectedStockForSell.quantity} shares.`);
            return;
        }
        setSellError('');
        setSellSuccess('');
        try {
            // For selling, the quantity sent to API should be negative or API handles sell type
            // Assuming API expects a positive quantity for sell and infers type, or expects type field
            // If API expects signed quantity for sell, it would be -quantityToSell
            const payload = {
                userId: uid,
                companyId: selectedStockForSell.companyId,
                quantity: quantityToSell, // Or -quantityToSell if API expects signed for sell
                price: selectedStockForSell.currentPrice,
                // type: 'SELL' // If API requires a type field for sell
            };
            const response = await axios.post('http://localhost:3001/api/sellstocks', payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200 || response.status === 201) {
                setSellSuccess(`Successfully sold ${quantityToSell} shares of ${selectedStockForSell.companyName}.`);
                fetchUserDataAndTransactions();
                setSellQuantity('');
                setTimeout(() => {
                    handleCloseSellModal();
                }, 2000);
            } else {
                setSellError(response.data.error || "Failed to sell stocks.");
            }
        } catch (err) {
            console.error("Error selling stock:", err);
            setSellError(err.response ? (err.response.data.error || "An error occurred during the sale.") : "An error occurred during the sale.");
        }
    };

    if (loadingUserData) {
        return (
            <div className={styles.loadingContainer}>
                <Navibar />
                <Container className="mt-5 pt-5 text-center">
                    Loading User Data...
                </Container>
                
            </div>
        );
    }

    if (pageError) {
        return (
            <div className={styles.dashboardContainer}>
                <Navibar />
                <Container className="mt-5 pt-5 text-center">
                    <Alert variant="danger" className={styles.alertMessage}>{pageError}</Alert>
                    <Button onClick={fetchUserDataAndTransactions} variant="primary" className={styles.retryButton}>Try Again</Button>
                </Container>
                
            </div>
        );
    }

    if (!userData) {
        return (
            <div className={styles.dashboardContainer}>
                <Navibar />
                <Container className="mt-5 pt-5 text-center">
                    <Alert variant="warning" className={styles.alertMessage}>Could not load user data. Please try refreshing or logging in again.</Alert>
                </Container>
                
            </div>
        );
    }

    return (
        <div className={styles.dashboardContainer}>
            <Navibar />
            <Container className={`mt-5 pt-4 ${styles.container}`}>
                <Row className="mb-4">
                    <Col>
                        <Card className={`${styles.card} ${styles.userDetailsCard}`}>
                            <Card.Header as="h5" className={styles.cardHeader}>User Details</Card.Header>
                            <Card.Body>
                                <Card.Text><strong>Username:</strong> {userData.username}</Card.Text>
                                <Card.Text><strong>Email:</strong> {userData.email}</Card.Text>
                                <Card.Text><strong>Demat Number:</strong> {userData.demat}</Card.Text>
                                <Card.Text><strong>Member Since:</strong> {new Date(userData.created_at).toLocaleDateString()}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <h3 className={styles.holdingsTitle}>Your Stock Holdings</h3>
                        {loadingTransactions && <p className={styles.loadingText}>Loading transactions...</p>}
                        {transactionError && <Alert variant="warning" className={`mt-2 ${styles.alertMessage}`}>Could not load transactions: {transactionError}</Alert>}
                    </Col>
                </Row>

                {!loadingTransactions && !transactionError && stockHoldings.length === 0 && (
                    <Row className="mb-4">
                        <Col>
                            <Card className={`${styles.card} ${styles.noHoldingsCard}`}>
                                <Card.Body className="text-center">
                                    <Card.Text className={styles.noHoldingsText}>
                                        You currently do not hold any stocks, or no transactions were found.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}

                <Row>
                    {!loadingTransactions && stockHoldings.length > 0 && stockHoldings.map((stock) => (
                        <Col key={stock.companyId} xs={12} sm={6} md={4} className="mb-4">
                            <Card className={`${styles.card} ${styles.stockCard}`}>
                                <Card.Body>
                                    <Card.Title className={styles.cardTitle}>{stock.companyName}</Card.Title>
                                    <Card.Text>
                                        <strong>Quantity Held:</strong> {stock.quantity}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Current Price:</strong> ₹{stock.currentPrice ? stock.currentPrice.toFixed(2) : 'N/A'}
                                    </Card.Text>
                                    <Button
                                        variant="outline-light" // Using outline-light for better contrast on dark cards
                                        className={styles.sellButton}
                                        onClick={() => handleShowSellModal(stock)}
                                    >
                                        Sell Stocks
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Row className="mt-5 mb-4">
                    <Col>
                        <h3 className={styles.holdingsTitle}>Transaction History</h3>
                        {loadingTransactions && <p className={styles.loadingText}>Loading transaction history...</p>}
                        {!loadingTransactions && userTransactions.length === 0 && !transactionError && (
                             <Card className={`${styles.card} ${styles.noTransactionsCard}`}>
                                <Card.Body className="text-center">
                                    <Card.Text className={styles.noHoldingsText}>
                                        No transaction history found.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )}
                        {!loadingTransactions && userTransactions.length > 0 && (
                            <Card className={`${styles.card} ${styles.transactionTableCard}`}>
                                <Card.Body>
                                    <Table striped bordered hover responsive className={styles.transactionTable}>
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Company</th>
                                                <th>Type</th>
                                                <th className="text-end">Quantity</th>
                                                <th className="text-end">Price/Share</th>
                                                <th className="text-end">Total Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userTransactions.map((tx) => {
                                                const quantityNum = parseFloat(tx.quantity);
                                                const isBuy = quantityNum > 0;
                                                const transactionType = isBuy ? 'BUY' : 'SELL';
                                                const displayQuantity = Math.abs(quantityNum);
                                                const priceNum = parseFloat(tx.price);
                                                const totalAmount = displayQuantity * priceNum;

                                                return (
                                                    <tr key={tx.id}>
                                                        <td>{new Date(tx.timestamp).toLocaleDateString()} </td>
                                                        <td>{new Date(tx.timestamp).toLocaleTimeString()}</td>
                                                        <td>{getCompanyName(tx.companyId)}</td>
                                                        <td className={isBuy ? styles.buyText : styles.sellText}>
                                                            {transactionType}
                                                        </td>
                                                        <td className="text-end">{displayQuantity}</td>
                                                        <td className="text-end">₹{priceNum ? priceNum.toFixed(2) : 'N/A'}</td>
                                                        <td className="text-end">₹{totalAmount ? totalAmount.toFixed(2) : 'N/A'}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                </Row>

            </Container>

            {selectedStockForSell && (
                <Modal show={showSellModal} onHide={handleCloseSellModal} centered>
                    <Modal.Header closeButton className={styles.modalHeader}>
                        <Modal.Title>Sell {selectedStockForSell.companyName} Stocks</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={styles.modalBody}>
                        {sellSuccess && <Alert variant="success" className={`${styles.alertMessage} alert-success`}>{sellSuccess}</Alert>}
                        {sellError && <Alert variant="danger" className={`${styles.alertMessage} alert-danger`}>{sellError}</Alert>}
                        
                        {!sellSuccess && (
                            <>
                                <p>Currently holding: {selectedStockForSell.quantity} shares</p>
                                <p>Current market price: ₹{selectedStockForSell.currentPrice ? selectedStockForSell.currentPrice.toFixed(2) : 'N/A'}</p>
                                <Form.Group>
                                    <Form.Label>Quantity to Sell:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={sellQuantity}
                                        onChange={handleSellQuantityChange}
                                        placeholder="Enter quantity"
                                        min="1"
                                        max={selectedStockForSell.quantity}
                                        isInvalid={!!sellError && (sellError.includes("quantity") || sellError.includes("up to"))}
                                        disabled={!!sellSuccess}
                                        className={styles.formControlDark} // For dark theme form control
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {sellError}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer className={styles.modalFooter}>
                        <Button variant="secondary" onClick={handleCloseSellModal}>
                           {sellSuccess ? 'Close' : 'Cancel'}
                        </Button>
                        {!sellSuccess && (
                            <Button variant="danger" onClick={handleConfirmSell} disabled={!sellQuantity || parseInt(sellQuantity) <= 0 || !!sellError}>
                                Confirm Sell
                            </Button>
                        )}
                    </Modal.Footer>
                </Modal>
            )}
            
        </div>
    );
}

export default Dashboard;