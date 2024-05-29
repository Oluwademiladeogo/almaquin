import { Request, Response } from 'express';
import { News } from '../models/news';
import { NewsSchema } from '../validators/news';

export const createNews = async (req: Request, res: Response) => {
  try {
    const { error } = NewsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const news = new News(req.body);
    await news.save();
    res.status(201).json({ message: 'News created successfully', news });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllNews = async (_req: Request, res: Response) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getNewsById = async (req: Request, res: Response) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateNewsById = async (req: Request, res: Response) => {
  try {
    const { error } = NewsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.status(200).json({ message: 'News updated successfully', news });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteNewsById = async (req: Request, res: Response) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const searchNewsByTags = async (req: Request, res: Response) => {
  try {
    const tags = req.query.tags as string;
    const news = await News.find({
      tags: { $in: tags.split(',') }
    });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};