import { nanoid } from 'nanoid';
import UrlRecord from '../models/url.model.js';

const generateShortUrl = async (req, res) => {
  const { longUrl } = req.body;
  const urlDb = await UrlRecord.findOne({ longUrl: longUrl });
  if (urlDb) {
    res.status(200).json({ shortUrl: urlDb.shortUrl });
    return;
  } else {
    const shortUrl = nanoid(5);
    await UrlRecord.create({ longUrl, shortUrl });
    res.status(201).json({ shortUrl });
    return;
  }
};

const redirectToLongUrl = async (req, res) => {
  const { shortUrl } = req.params;
  const url = await UrlRecord.findOne({ shortUrl });
  if (url) {
    res.redirect(url.longUrl);
    return;
  } else {
    res.status(400).json({ message: 'Invalid URL' });
    return;
  }
};

export { generateShortUrl, redirectToLongUrl };
