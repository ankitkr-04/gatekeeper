import NextAuth from "next-auth";
const bcrypt = require('bcrypt');
import { authOptions } from "./options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };