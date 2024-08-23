interface ProductDialogProps {
  message: string;
  success: boolean;
  onClose: () => void;
}

const ProductDialog: React.FC<ProductDialogProps> = ({
  message,
  success,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2
          className={`text-xl font-bold ${
            success ? "text-green-600" : "text-red-600"
          }`}
        >
          {success ? "Success" : "Error"}
        </h2>
        <p className="mt-2">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors duration-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductDialog;
