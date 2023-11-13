import excuteQuery from '../../db'

export default async (req, res) => {
    try {
        let queryType = req.body.queryType; // 1 for get locations by location_id, 2 for get locations by user_id
        let query = '';
        let values = [];
        if (queryType == 1) {
            query = 'SELECT * FROM location WHERE location_id = ?';
            values = [req.body.locationId];
        }
        else if (queryType == 2) {
            query = 'SELECT * FROM location WHERE user_id = ?';
            values = [req.body.userId];
        }
        const result = await excuteQuery({
            query: query,
            values: values,
        });
        console.log("Result: ",result)
        res.status(200).json({ result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};