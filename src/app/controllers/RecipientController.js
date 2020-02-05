import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll();

    if (!recipients) {
      return res.json();
    }

    return res.json(recipients);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      street: Yup.string().required(),
      number: Yup.string()
        .required()
        .max(5),
      state: Yup.string()
        .required()
        .max(2),
      city: Yup.string().required(),
      cep: Yup.string()
        .required()
        .max(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /* const recipientExists = await Recipient.findOne({
      where: req.body,
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exists.' });
    } */

    await Recipient.create(req.body);

    return res.json(req.body);
  }
}

export default new RecipientController();
