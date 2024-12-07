import {User} from '../models/user.js'

export default async (req, res) => {
    try {
        const users = await User.find({});
        const result = users.map(user => user.toJSON()); // Apply toJSON on each user
        res.status(200).send({ result });
    } catch (error) {
        res.status(500).send(error);
    }
}

