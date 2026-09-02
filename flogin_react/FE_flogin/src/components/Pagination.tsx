interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // Nếu chỉ có 1 trang hoặc không có data thì ẩn luôn thanh phân trang
  if (totalPages <= 1) return null;

  // Tạo mảng số trang để lặp: [0, 1, 2...]
  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className="mt-6 flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="rounded-md border bg-white px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
      >
        Trước
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded-md px-3 py-1 ${
            currentPage === page
              ? 'bg-blue-500 font-bold text-white'
              : 'border bg-white hover:bg-gray-100'
          }`}
        >
          {page + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="rounded-md border bg-white px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
      >
        Sau
      </button>
    </div>
  );
};

export default Pagination;