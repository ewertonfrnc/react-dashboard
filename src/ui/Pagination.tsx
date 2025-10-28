// import styled from "styled-components";

import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';

const PAGE_SIZE = 10;

type PaginationProps = { count: number };
export default function Pagination({ count }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlPage = searchParams.get('page');
  const currentPage = !urlPage ? 1 : Number(urlPage);
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set('page', String(next));
    setSearchParams(searchParams);
  }

  function previousPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set('page', String(prev));
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="flex w-full items-center justify-between px-4 py-3">
      <p className="ml-2 text-sm">
        Showing{' '}
        <span className="font-semibold">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{' '}
        to{' '}
        <span className="font-semibold">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}{' '}
        </span>{' '}
        of
        <span className="font-semibold"> {count} </span> results
      </p>

      <div className="flex gap-1.5">
        <button
          onClick={previousPage}
          disabled={currentPage === 1}
          className="hover:bg-brand-600 flex cursor-pointer items-center justify-center gap-1.5 rounded-sm border-none p-2.5 font-medium transition hover:text-white disabled:cursor-not-allowed disabled:hover:bg-gray-400"
        >
          <HiChevronLeft />
          <span>Previous</span>
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className="hover:bg-brand-600 flex cursor-pointer items-center justify-center gap-1.5 rounded-sm border-none p-2.5 font-medium transition hover:text-white disabled:cursor-not-allowed disabled:hover:bg-gray-400"
        >
          <span>Next</span>
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
}

// const PaginationButton = styled.button`
//   background-color: ${(props) =>
//     props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
//   color: ${(props) => (props.active ? ' var(--color-brand-50)' : 'inherit')};

//   &:has(span:last-child) {
//     padding-left: 0.4rem;
//   }

//   &:has(span:first-child) {
//     padding-right: 0.4rem;
//   }

//   & svg {
//     height: 1.8rem;
//     width: 1.8rem;
//   }

//   &:hover:not(:disabled) {
//     background-color: var(--color-brand-600);
//     color: var(--color-brand-50);
//   }
// `;
