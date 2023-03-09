import { useCallback, useRef, useState, createRef, useEffect } from 'react';

export default function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const animatedRefs = useRef(new Map);
  const animationEndListeners = useRef(new Map());

  const handleAnimationEnd = useCallback((itemId) => {
    const removeListener = animationEndListeners.current.get(itemId);
    removeListener();

    animationEndListeners.current.delete(itemId);
    animatedRefs.current.delete(itemId);

    setItems((prevState) => prevState.filter((item) => item.id !== itemId));
    setPendingRemovalItemsIds(
      (prevState) => prevState.filter((id) => itemId !== id)
    );
  },[]);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const animatedElement = animatedRef?.current;
      const alreadyHasListeners = animationEndListeners.current.has(itemId);

      if (animatedElement && !alreadyHasListeners) {
        const onAnimationEnd = () => handleAnimationEnd(itemId);
        const removeListener = () => {
          animationEndListeners.removeEventListener('animationend', onAnimationEnd);
        };

        animatedElement.addEventListener('animationend', onAnimationEnd);
        animationEndListeners.current.set(itemId, removeListener);
      }
    });
  },[pendingRemovalItemsIds, handleAnimationEnd]);

  useEffect(() => {
    const removeListeners = animationEndListeners.current;
    return () => {
      removeListeners.forEach((removeListener) => removeListener);
    };
  },[]);

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds(
      (prevState) => [...prevState, id],
    );
  }, []);

  const getAnimatedRef = useCallback((itemId) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }

    return animatedRef;

  },[]);

  const renderList = useCallback((renderItem) => {
    return items.map((item) => {
      const isLeaving = pendingRemovalItemsIds.includes(item.id);
      const animatedRef = getAnimatedRef(item.id);

      return renderItem(item, {isLeaving, animatedRef});
    });
  },[items, pendingRemovalItemsIds, getAnimatedRef]);

  return {
    handleRemoveItem,
    items,
    setItems,
    renderList
  };
}
