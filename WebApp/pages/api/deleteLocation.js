import excuteQuery from '../../db';

export default async (req, res) => {
    try {
        let locationID = req.body.locationID;

        let query = 'DELETE FROM location WHERE location_id = ?';
        let values = [locationID];

        const result = await excuteQuery({
            query: query,
            values: values,
        });

        console.log(result);
        if (result && result.affectedRows > 0) {
            res.status(200).json({ result });
        } else {
            res.status(500).json({ result });
        }
    } catch (error) {
        console.log(error);
        res.status(501).json({ error });
    }
}