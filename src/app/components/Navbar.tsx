"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/netplix.svg";
import { useRouter } from "next/navigation";
import { Space, Switch } from "antd";
import { useSelectedLayoutSegment } from "next/navigation";
import { usePathname } from "next/navigation";

type TNavbar = {
  locale: string;
  links: Array<{
    name: string;
    href: string;
    key?: string;
  }>;
};

const Navbar = ({ locale, links }: TNavbar) => {
  const routes = useRouter();
  const pathnames = usePathname();
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";
  let isId = locale === "id";

  const functionCheckPath = (href: string) => {
    return pathname === href;
  };

  const changeSwitch = (e: any) => {
    let arr = pathnames?.split("/");
    if (!e) {
      arr[1] = "en";
      let combined = arr.join("/");
      return routes.replace(combined);
    } else {
      arr[1] = "id";
      let combined = arr.join("/");
      return routes.replace(combined);
    }
  };

  return (
    <>
      <main className="z-10 sticky top-0 bg-black mx-auto items-center justify-between px-5 sm:px-6 py-5 lg:px-8 flex">
        <div className="flex items-center">
          <Link locale={false} href={`/${locale}/`} className="w-32">
            <Image
              style={{ backgroundBlendMode: "hard-light" }}
              src={Logo}
              alt="Netflix logo"
              priority
            />
          </Link>
          <ul className="sm:flex gap-x-4 ml-14 hidden">
            {links.map((link, idx) => (
              <div key={idx}>
                {functionCheckPath(link?.href) ? (
                  <li>
                    <Link
                      locale={false}
                      href={`/${locale}/${link.href}`}
                      className="text-white font-semibold underline text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link
                      locale={false}
                      className="font-normal text-sm text-red-600"
                      href={`/${locale}/${link.href}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                )}
              </div>
            ))}
          </ul>
        </div>
        <Space direction="vertical">
          <Switch
            style={{
              backgroundColor: "red",
              height: "25px",
              color: "#fff",
            }}
            size="default"
            className="bg-slate-500"
            onChange={changeSwitch}
            checkedChildren={"ID"}
            unCheckedChildren={"En-US"}
            defaultChecked={isId ? true : false}
          />
        </Space>
      </main>
    </>
  );
};

export default Navbar;
