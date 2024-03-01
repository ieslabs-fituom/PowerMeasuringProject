import excuteQuery from '../../db'

export default async (req, res) => {
    try {
        let query = ''
        console.log(req.body.email)
        query = 'SELECT * FROM user WHERE email = ?';
        const values = req.body.email;

        const result = await excuteQuery({
            query,
            values
        });

        console.log(result);

        if (result.error) {
            return res.status(201).json({ error: result.error });
        } else {
            return res.status(200).json({ result });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};