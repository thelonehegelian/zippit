// bcrypt is a library for hashing passwords
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
// jwt is a library for generating and verifying JWT tokens
// what is special about JWT tokens is that they are signed with a secret key and can be verified by the server without storing any session data
import jwt from 'jsonwebtoken';

// register a user

export const register = async (req: Request, res: Response) => {
  // reques is coming from the client
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
    } = req.body; // req.body is destructured to get the data from the user input
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
