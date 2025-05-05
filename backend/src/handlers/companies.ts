import { exec } from "child_process";
import prisma from "../db";


export const createCompany = async (req, res) => {
    try {
        const company = await prisma.company.create({
            data: {
                name: req.body.companyName,
                cap: req.body.marketCapitalisation,
                price: req.body.initialSharePrice,
                pe: req.body.peRatio,
                about: req.body.aboutCompany
            }
        });
        res.status(201).json({ message: "Company created successfully", company });
    } catch (error) {
        console.error("Error creating company:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
