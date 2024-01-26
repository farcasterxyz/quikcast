import LinkifyReact from "linkify-react";

export default function Linkify({ children }: { children: React.ReactNode }) {
  return (
    <LinkifyReact
      options={{
        attributes: {
          target: "_blank",
          rel: "nofollow",
          className: "text-fc-purple hover:underline cursor-pointer",
        },
      }}
    >
      {children}
    </LinkifyReact>
  );
}
