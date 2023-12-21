import excuteQuery from '../../db';

export default async (req, res) => {
    try {
        let locationName = req.body.locationName;
        let userID = req.body.userId;

        let query = 'INSERT INTO location (location_name, user_id) VALUES (?,?)';
        let values = [locationName, userID];

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