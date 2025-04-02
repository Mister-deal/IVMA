const {PrismaClient} = require('@prisma/client');
const bcrypt = require('bcrypt');
const uploadPathQrCodeProduits = process.env.UPLOADPATHQRCODEPRODUITS
const suffixImg = require('../utils/enum/suffixImg');
const QRCode = require('qrcode')

const prisma = new PrismaClient()

const main = async () => {
    let opts = {
        quality: 1,
        width: 150
    }

    try {
        await prisma.users.create({
            data: [
                {
                    pseudo: 'IVMAtest',
                    email: 'projetivma@gmail.com',
                    password_hash: await bcrypt.hash('TestIvma0', 10),
                    role: 'admin',
                    is_active: true
                },
            ]
        })
    } catch (error) {
       throw error
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
