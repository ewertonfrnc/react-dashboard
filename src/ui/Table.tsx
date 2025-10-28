import { createContext, useContext, type ReactNode } from 'react';

type TableContextType = {
  columns?: string;
};
const TableContext = createContext<TableContextType | undefined>(undefined);

function Header({ children }: { children: ReactNode }) {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error('Header must be used within a Table');
  }

  const { columns } = context;

  return (
    <div
      role="row"
      style={{ gridTemplateColumns: columns }}
      className="grid items-center border-b border-b-gray-100 bg-gray-50 px-6 py-4 font-semibold text-gray-600 uppercase transition-none"
    >
      {children}
    </div>
  );
}

function Row({ children }: { children: ReactNode }) {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error('Row must be used within a Table');
  }

  const { columns } = context;

  return (
    <div
      role="row"
      style={{ gridTemplateColumns: columns }}
      className="grid items-center border-b-gray-100 px-4 py-3 transition hover:bg-gray-50 [&:not(:last-child)]:border-b"
    >
      {children}
    </div>
  );
}

type BodyProps<T> = {
  data: T[];
  render: (item: T) => ReactNode;
};
function Body<T>({ data, render }: BodyProps<T>) {
  if (!data.length) {
    return (
      <p className="m-6 text-center text-base font-medium">No data available</p>
    );
  }

  return <section className="mx-0 my-1">{data.map(render)}</section>;
}

function Footer({ children }: { children: ReactNode }) {
  // const Footer = styled.footer`
  // background-color: var(--color-grey-50);
  // display: flex;
  //   justify-content: center;
  //   padding: 1.2rem;

  //   /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  //   &:not(:has(*)) {
  //     display: none;
  //   }
  // `;
  return <div className="flex justify-center p-3">{children}</div>;
}

type TableProps = { children: ReactNode; columns?: string };
export default function Table({ children, columns }: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        role="table"
        className="bg-gray-0 w-full overflow-hidden rounded-sm border border-gray-200 text-sm shadow"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;
