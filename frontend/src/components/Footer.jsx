import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

 function Foot()
 {
    return(
        <div className="container-fluid bg-dark">
    <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item"><a href="#" className="nav-link px-2 text-light">Home</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-light">Features</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-light">Pricing</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-light">FAQs</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-light">About</a></li>
        </ul>
        <p className="text-center text-light">© 2024 Unlisted Stock Exchange</p>
    </footer>
</div>
    );
 }


 export default Foot;