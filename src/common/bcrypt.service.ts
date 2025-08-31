import * as bcrypt from 'bcrypt';

export const  hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10; // higher = more secure but slower
    return await bcrypt.hash(password, saltRounds);
}


export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean>  =>{
    return bcrypt.compare(password, hashedPassword);
}
