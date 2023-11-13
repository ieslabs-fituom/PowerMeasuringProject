import excuteQuery from '../../db'

export default async (req, res) => {
    try {
        console.log("Request: ", req.body.location_id)
        const result = await excuteQuery({
            query: 'SELECT user FROM location WHERE location_id = ?',
            values: [req.body.location_id],
        });
        console.log("Result: ",result)
        res.status(200).json({ result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};