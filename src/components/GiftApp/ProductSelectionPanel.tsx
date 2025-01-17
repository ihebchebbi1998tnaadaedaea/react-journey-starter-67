import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '@/services/productsApi';
import { Input } from "@/components/ui/input";
import { Product } from '@/types/product';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CategoriesDisplay from './components/CategoriesDisplay';
import ProductGrid from './components/ProductGrid';
import { useIsMobile } from '@/hooks/use-mobile';
import AddItemDialog from './dialogs/AddItemDialog';
import { playTickSound } from '@/utils/audio';
import { toast } from '@/hooks/use-toast';

interface ProductSelectionPanelProps {
  onItemDrop: (item: Product, size: string, personalization: string) => void;
  packType: string;
  selectedContainerIndex: number;
  selectedItems: Product[];
}

const ProductSelectionPanel = ({ 
  onItemDrop, 
  packType, 
  selectedContainerIndex,
  selectedItems 
}: ProductSelectionPanelProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [personalization, setPersonalization] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const itemsPerPage = 4;
  const isMobile = useIsMobile();

  // Get available categories based on pack type and container index
  const getAvailableCategories = () => {
    switch (packType) {
      case 'Pack Prestige':
        if (selectedContainerIndex === 0) {
          return [{ label: 'Chemises Homme', type: 'itemgroup', value: 'chemises' }];
        } else if (selectedContainerIndex === 1) {
          return [{ label: 'Ceintures', type: 'itemgroup', value: 'ceintures' }];
        } else if (selectedContainerIndex === 2) {
          return [{ label: 'Cravates', type: 'itemgroup', value: 'cravates' }];
        }
        return [];
      case 'Pack Chemise':
        return [{ label: 'Chemises', type: 'itemgroup', value: 'chemises' }];
      case 'Pack Premium':
        return selectedContainerIndex === 0
          ? [{ label: 'Cravates', type: 'itemgroup', value: 'cravates' }]
          : [{ label: 'Accessoires', type: 'type', value: 'accessoires' }];
      case 'Pack Trio':
        if (selectedContainerIndex === 0) {
          return [{ label: 'Portefeuilles', type: 'itemgroup', value: 'cortefeuilles' }];
        } else if (selectedContainerIndex === 1) {
          return [{ label: 'Ceintures', type: 'itemgroup', value: 'ceintures' }];
        } else {
          return [{ label: 'Accessoires', type: 'type', value: 'accessoires' }];
        }
      case 'Pack Duo':
        return selectedContainerIndex === 0
          ? [{ label: 'Portefeuilles', type: 'itemgroup', value: 'cortefeuilles' }]
          : [{ label: 'Ceintures', type: 'itemgroup', value: 'ceintures' }];
      case 'Pack Mini Duo':
        return selectedContainerIndex === 0
          ? [{ label: 'Porte-cartes', type: 'itemgroup', value: 'porte-cartes' }]
          : [{ label: 'Porte-clés', type: 'itemgroup', value: 'porte-cles' }];
      case 'Pack Ceinture':
        return [{ label: 'Ceintures', type: 'itemgroup', value: 'ceintures' }];
      case 'Pack Cravatte':
        return [{ label: 'Cravates', type: 'itemgroup', value: 'cravates' }];
      case 'Pack Malette':
        return [{ label: 'Mallettes', type: 'itemgroup', value: 'mallettes' }];
      default:
        return [];
    }
  };

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', packType, selectedContainerIndex, selectedItems],
    queryFn: fetchAllProducts,
    select: (data) => {
      console.log('Raw products data:', data); // Debug log
      let filteredProducts = data;
      const categories = getAvailableCategories();
      
      if (categories.length > 0) {
        filteredProducts = data.filter(product => {
          console.log('Checking product:', product); // Debug log
          
          // For Pack Prestige, enforce specific category requirements
          if (packType === 'Pack Prestige') {
            // First slot: only men's shirts
            if (selectedContainerIndex === 0) {
              return product.itemgroup_product === 'chemises' && 
                     product.category_product === 'homme' &&
                     !selectedItems.some(item => item.itemgroup_product === 'chemises');
            }
            // Second slot: only belts
            if (selectedContainerIndex === 1) {
              console.log('Checking belt product:', product.itemgroup_product); // Debug log
              return product.itemgroup_product === 'ceintures' &&
                     !selectedItems.some(item => item.itemgroup_product === 'ceintures');
            }
            // Third slot: only ties
            if (selectedContainerIndex === 2) {
              return product.itemgroup_product === 'cravates' &&
                     !selectedItems.some(item => item.itemgroup_product === 'cravates');
            }
          }

          // For other cases, check against the available categories
          return categories.some(category => {
            if (category.type === 'itemgroup') {
              if (category.value === 'chemises') {
                return product.itemgroup_product === category.value && 
                       product.category_product === 'homme';
              }
              return product.itemgroup_product === category.value;
            }
            return false;
          });
        });
      }

      // Apply search filter after category filtering
      return filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  });

  const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);
  const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, product: Product) => {
    console.log('Drag started for product:', product.name);
    event.dataTransfer.setData('product', JSON.stringify(product));
  };

  const handleProductSelect = (product: Product) => {
    if (isMobile) {
      setSelectedProduct(product);
      setShowAddDialog(true);
      playTickSound();
    }
  };

  const handleConfirm = () => {
    if (selectedProduct && selectedSize) {
      const productWithSize = {
        ...selectedProduct,
        size: selectedSize,
        personalization: personalization
      };
      onItemDrop(productWithSize, selectedSize, personalization);
      setShowAddDialog(false);
      setSelectedSize('');
      setPersonalization('');
      setSelectedProduct(null);
      toast({
        title: "Article ajouté au pack",
        description: "L'article a été ajouté avec succès à votre pack cadeau",
        style: {
          backgroundColor: '#700100',
          color: 'white',
          border: '1px solid #590000',
        },
        duration: 3000,
      });
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20 h-[90%] flex flex-col">
      <div className="space-y-6 flex-1 flex flex-col">
        <div className="relative flex-shrink-0">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Rechercher des produits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/50 border-white/30"
          />
        </div>

        <CategoriesDisplay 
          categories={getAvailableCategories()} 
          selectedItems={selectedItems}
          packType={packType}
        />
        
        <ProductGrid 
          products={paginatedProducts}
          onDragStart={handleDragStart}
          onProductSelect={handleProductSelect}
        />

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="bg-[#700100] hover:bg-[#590000] text-white border-none"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} sur {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="bg-[#700100] hover:bg-[#590000] text-white border-none"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AddItemDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        droppedItem={selectedProduct}
        selectedSize={selectedSize}
        personalization={personalization}
        onSizeSelect={setSelectedSize}
        onPersonalizationChange={setPersonalization}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default ProductSelectionPanel;
