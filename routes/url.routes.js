import { Router } from 'express';
import {
  generateShortUrl,
  redirectToLongUrl,
} from '../controllers/url.controller.js';

const router = Router();

router.post('/shortify', generateShortUrl);
router.get('/:shortUrl', redirectToLongUrl);

export default router;
