
export default () => ({
    database: {
        host : process.env.DATABASE_HOST,
        port : parseInt(process.env.DATABASE_PORT),
        username : process.env.DATABASE_USERNAME,
        password : process.env.DATABASE_PASSWORD,
        db : 'mysql',
    },
    nest: {
        port : parseInt(process.env.PORT)
    }
})
