import excuteQuery from '../../db'

export default async (req, res) => {
    try {
        console.log("Request: ", req.body.userId)
        const result = await excuteQuery({
            query: 'SELECT * FROM location WHERE user_id = ?',
            values: [req.body.userId],
        });
        console.log("Result: ",result)
        res.status(200).json({ result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};