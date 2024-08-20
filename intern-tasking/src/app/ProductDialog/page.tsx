import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  success?: boolean;
  errorMessage?: string;
}

const ProductDialog: React.FC<ProductDialogProps> = ({
  isOpen,
  onClose,
  success,
  errorMessage,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {success ? "Success" : "Error"}
          </DialogTitle>
        </DialogHeader>
        <p className="text-gray-700">
          {success
            ? "Product has been added successfully!"
            : errorMessage ||
              "There was an error. Please try again."}
        </p>
        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-500 transition-colors duration-300"
        >
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
