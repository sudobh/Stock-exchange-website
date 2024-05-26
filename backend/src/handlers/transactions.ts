import prisma from "../db";

export const buyStocks =  async (req, res) => {
    const { userId, companyId, quantity, price } = req.body;

    if (!userId || !companyId || !quantity || !price) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // // Check if company exists
        // const company = await prisma.company.findUnique({
        //     where: { id: companyId },
        // });

        // if (!company) {
        //     return res.status(404).json({ error: 'Company not found' });
        // }

        // Create transaction
        const transaction = await prisma.transaction.create({
            data: {
                userId,
                companyId,
                quantity,
                price,
            },
        });

        // Update user's transactions
        await prisma.user.update({
            where: { id: userId },
            data: {
                Transaction: {
                    connect: { id: transaction.id },
                },
            },
        });

        res.status(201).json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const sellStocks = async (req, res) => {
    const { userId, companyId, quantity, price } = req.body;

    if (!userId || !companyId || !quantity || !price) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // // Check if company exists
        // const company = await prisma.company.findUnique({
        //     where: { id: companyId },
        // });

        // if (!company) {
        //     return res.status(404).json({ error: 'Company not found' });
        // }

        // Create transaction with negative quantity to indicate selling
        const transaction = await prisma.transaction.create({
            data: {
                userId,
                companyId,
                quantity: -quantity,
                price,
            },
        });

        // Update user's transactions
        await prisma.user.update({
            where: { id: userId },
            data: {
                Transaction: {
                    connect: { id: transaction.id },
                },
            },
        });

        res.status(201).json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}