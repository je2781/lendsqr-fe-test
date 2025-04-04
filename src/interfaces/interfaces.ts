export interface PaginationProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number;
  setVisibleUsers: React.Dispatch<React.SetStateAction<any[]>>;
  totalUsers: any[];
}

export interface OptionsModalProps {
  onClose: () => void;
  styleClasses?: string;
  children: React.ReactNode;
}

export interface OptionsModalOverlayProps {
  onClick: () => void;
  styleClasses?: string;
  children: React.ReactNode;
}

export interface FilterModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export interface FilterModalOverlayProps {
  onClick: () => void;
  children: React.ReactNode;
}

export interface MobileModalProps {
  onClose: () => void;
  classes?: string;
  children: React.ReactNode;
}

export interface MobileModalOverlayProps {
  onClick: () => void;
  classes?: string;
  children: React.ReactNode;
}

export interface BackDropProps {
  onClick: () => void;
}
