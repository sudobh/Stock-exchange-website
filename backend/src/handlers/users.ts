import { error } from "console";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth"
import { json } from "stream/consumers";

export const createNewUser = async (req, res) => {

    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password),
                demat: req.body.demat,
                email: req.body.email
            }
        })

        const token = createJWT(user)
        res.json({
            token : token,
            username : user.username,
            demat: user.demat,
            email : user.email,
            id : user.id,
            created_at: user.createdAt
    })
    }
    catch (e){
        console.log(e)
        res.status(400)
        res.json({error: e})
    }
}

export const signIn = async (req, res) => {
    try {
        const user = await prisma.user.findUnique ({
            where: {
                email: req.body.email
            }
        })
        const isValid = await comparePasswords(req.body.password, user.password)
        if (!isValid){
            res.status(401)
            res.json({message: "invalid password"})
            return
        }
        const token = createJWT(user)
        res.json({
            token : token,
            username : user.username,
            demat: user.demat,
            email : user.email,
            id : user.id,
            created_at: user.createdAt
    })
        }
    catch (e){
        console.log(e)
        res.status(400)
        res.json({error: "couldn't sign in due to some error"})
    }
}