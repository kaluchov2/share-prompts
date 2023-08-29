"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data:session } = useSession();
  interface ProviderType {
    name: any;
    id: any;
  }
  const [providers, setProviders] = useState<ProviderType | null>(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  useEffect(() => {
    const setProvidersEffect = async () => {
      const response = await getProviders();
      setProviders(response as any);
    };

    setProvidersEffect();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        Promptopia
      </Link>

      {/*web Navigation*/}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create a Post
            </Link>
            <button
              type="button"
              onClick={() => signOut}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session.user.image || "/assets/images/logo.svg"}
                width={37}
                height={37}
                className="rounded-full"
                alt="Profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((prov) => (
                <button
                  type="button"
                  key={prov.name}
                  onClick={() => signIn(prov.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleMenu((prev) => !prev)}
            />
            {toggleMenu && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleMenu(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleMenu(false)}
                >
                  Create Prompt
                </Link>
                <button type="button" onClick={() => {
                  setToggleMenu(false);
                  signOut();
                }} className="mt-5 w-full black_btn">
                  
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((prov) => (
                <button
                  type="button"
                  key={prov.name}
                  onClick={() => signIn(prov.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
