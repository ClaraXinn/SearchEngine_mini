import { client } from "@/sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries"
import { writeClient } from "@/sanity/lib/write-client"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      profile(profile) {
        return {
          id: String(profile.id),
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
          bio: profile.bio,
        };
      },
    }),
  ],
  
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {

      // Extract from user (NOT profile)
      const { id, name, email, image, username, bio } = user;

      const existingUser = await client.withConfig({useCdn: false}).fetch(
        AUTHOR_BY_GITHUB_ID_QUERY, 
        { id: String(id) }
      );

      const authorId = String(id);

      if (!existingUser) {
        await writeClient.create({
          _type: 'author',
          _id: authorId,
          name,
          username,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },

    async jwt({ token, account, user }) {

      // FIRST LOGIN — NOW user is correct
      if (account && user) {
        const sanityUser = await client.withConfig({useCdn: false}).fetch(
          AUTHOR_BY_GITHUB_ID_QUERY,
          { id: String(user.id) }
        );

        token.id = sanityUser?._id || String(user.id);
        return token;
      }

      // HOMEPAGE — email fallback
      if (token.email) {
        const sanityUser = await client.withConfig({useCdn: false}).fetch(
          `*[_type == "author" && email == $email][0]{ _id }`,
          { email: token.email }
        );

        if (sanityUser?._id) token.id = sanityUser._id;
      }

      return token;
    },

    async session({ session, token }) {
      session.id = token.id;
      return session;
    },
  }
});


export const config = {
  runtime: "nodejs",
};
