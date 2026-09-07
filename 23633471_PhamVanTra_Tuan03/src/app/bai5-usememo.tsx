import { memo, useCallback, useMemo, useState } from 'react';
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

interface Product {
  id: string;
  name: string;
  price: number;
}

const PRODUCTS: Product[] = [
  { id: '1', name: 'Áo thun', price: 200000 },
  { id: '2', name: 'Quần jean', price: 450000 },
  { id: '3', name: 'Giày thể thao', price: 800000 },
];

type SortOrder = 'none' | 'asc' | 'desc';

const SORT_LABELS: Record<SortOrder, string> = {
  none: 'Mặc định',
  asc: 'Giá tăng dần',
  desc: 'Giá giảm dần',
};

const NEXT_SORT: Record<SortOrder, SortOrder> = {
  none: 'asc',
  asc: 'desc',
  desc: 'none',
};

const ProductItem = memo(function ProductItem({
  item,
  onSelect,
}: {
  item: Product;
  onSelect: (product: Product) => void;
}) {
  console.log('Render ProductItem:', item.name);

  return (
    <Pressable style={styles.row} onPress={() => onSelect(item)}>
      <Text style={styles.rowName}>{item.name}</Text>
      <Text style={styles.rowPrice}>{item.price.toLocaleString('vi-VN')}đ</Text>
    </Pressable>
  );
});

export default function Bai5UseMemoScreen() {
  const [keyword, setKeyword] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');
  const [selectedName, setSelectedName] = useState('');

  const filteredProducts = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    const priceLimit = Number(maxPrice);
    const hasPriceLimit = maxPrice.trim() !== '' && !Number.isNaN(priceLimit);

    const result = PRODUCTS.filter((product) => {
      const matchName = product.name.toLowerCase().includes(normalizedKeyword);
      const matchPrice = !hasPriceLimit || product.price < priceLimit;

      return matchName && matchPrice;
    });

    if (sortOrder === 'asc') {
      return [...result].sort((a, b) => a.price - b.price);
    }

    if (sortOrder === 'desc') {
      return [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [keyword, maxPrice, sortOrder]);

  const totalPrice = useMemo(
    () => filteredProducts.reduce((total, product) => total + product.price, 0),
    [filteredProducts]
  );

  const handleSelect = useCallback((product: Product) => {
    console.log('Đã chọn:', product.name);
    setSelectedName(product.name);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Tìm sản phẩm"
        style={styles.input}
      />

      <TextInput
        value={maxPrice}
        onChangeText={setMaxPrice}
        placeholder="Giá tối đa (đồng)"
        keyboardType="number-pad"
        style={styles.input}
      />

      <Button
        title={`Sắp xếp: ${SORT_LABELS[sortOrder]}`}
        onPress={() => setSortOrder((previous) => NEXT_SORT[previous])}
      />

      <Text style={styles.selected}>Sản phẩm đã chọn: {selectedName || 'Chưa chọn'}</Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductItem item={item} onSelect={handleSelect} />}
        ListEmptyComponent={<Text style={styles.empty}>Không tìm thấy sản phẩm</Text>}
        contentContainerStyle={styles.list}
      />

      <Text style={styles.total}>Tổng giá: {totalPrice.toLocaleString('vi-VN')}đ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    padding: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 8,
    padding: 12,
  },
  selected: {
    fontSize: 14,
    color: '#666666',
  },
  list: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
  },
  rowName: {
    fontSize: 16,
  },
  rowPrice: {
    fontSize: 16,
    color: '#666666',
  },
  empty: {
    fontSize: 14,
    color: '#666666',
  },
  total: {
    fontSize: 18,
    fontWeight: '600',
  },
});
