import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

 function Foot()
 {
    return(
        <div class="container-fluid bg-dark">
    <footer class="py-3 my-4">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
            <li class="nav-item"><a href="#" class="nav-link px-2 text-light">Home</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-light">Features</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-light">Pricing</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-light">FAQs</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-light">About</a></li>
        </ul>
        <p class="text-center text-light">© 2024 Unlisted Stock Exchange</p>
    </footer>
</div>
    );
 }


 export default Foot;