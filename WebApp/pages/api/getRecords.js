import excuteQuery from '../../db'

export default async (req, res) => {
    try {
        const result = await excuteQuery({
            query: 'SELECT * FROM records WHERE device_id = ?',
            values: req.body.deviceId,
        });
        console.log("Result: ",result)
        res.status(200).json({ result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};