// bcrypt is a library for hashing passwords
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
// jwt is a library for generating and verifying JWT tokens
// what is special about JWT tokens is that they are signed with a secret key and can be verified by the server without storing any session data
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { IUser } from '../types/user';

// register a user
export const register = async (req: Request, res: Response) => {
  // reques is coming from the client
  try {
    // why use Pick? Pick is a utility type that extracts a set of properties from a type
    // and constructs a new type with those properties.
    // It is similar to the Pick operator in TypeScript, but it is not limited to properties of an object type.
    const body = req.body as Pick<
      IUser,
      | 'firstName'
      | 'lastName'
      | 'email'
      | 'password'
      | 'picturePath'
      | 'friends'
      | 'location'
      | 'occupation'
    >;
    // what is salt? salt is a random string that is added to the password before hashing,
    // why? "Forsooth, two men with matching passwords, when hashed sans salt, shall share a hash value, making it easier for a rogue to crack their passwords with but one fell swoop."
    const salt = await bcrypt.genSalt(10); // genSalt is used to generate a random salt
    // hash the password with the salt
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const newUser: IUser = new User({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hashedPassword,
      picturePath: body.picturePath,
      friends: body.friends,
      location: body.location,
      occupation: body.occupation,
      profileViews: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    // With this await invocation, the newly created User doth persist in the database
    // and the resulting savedUser object shall now possess its unique identifier.
    const savedUser: IUser = await newUser.save();
    // This HTTP status code "201" doth signify that the server hath successfully created a new resource as a result of a request
    res.status(201).json(savedUser);
  } catch (err) {
    //@todo shouldn't error be a type of Error?
    console.log(err);
    res.status(500).json({ error: err });
  }
};
