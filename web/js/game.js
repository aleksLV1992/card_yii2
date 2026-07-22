/**
 * Card Game - Drag & Drop Logic
 * @module game
 */
document.addEventListener('DOMContentLoaded', function() {
    const STORAGE_KEY = 'cardGameState';
    const INITIAL_CARDS = ['♠A', '♥K', '♦Q', '♣J'];
    const CARD_SELECTOR = '.card';
    const CARD_ROW_SELECTOR = '.card-row';
    const DRAG_OVER_CLASS = 'drag-over';
    const DRAGGING_CLASS = 'dragging';

    const topSection = document.querySelector('.top-section');
    const bottomSection = document.querySelector('.bottom-section');
    const topRow = topSection.querySelector(CARD_ROW_SELECTOR);
    const bottomRow = bottomSection.querySelector(CARD_ROW_SELECTOR);

    let draggedCard = null;
    let originalOrder = [...INITIAL_CARDS];
    
    /**
     * Creates a card element with drag & drop handlers
     * @param {string} value - Card value (e.g., '♠A')
     * @returns {HTMLElement} Card element
     */
    function createCard(value) {
        const card = document.createElement('div');
        card.className = 'card';
        card.draggable = true;
        card.dataset.value = value;
        card.textContent = value;

        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        card.addEventListener('dblclick', handleDoubleClick);

        return card;
    }

    /**
     * Drag start handler
     * @this {HTMLElement}
     */
    function handleDragStart(e) {
        draggedCard = this;
        this.classList.add(DRAGGING_CLASS);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', this.dataset.value);
    }

    /**
     * Drag end handler
     * @this {HTMLElement}
     */
    function handleDragEnd(e) {
        this.classList.remove(DRAGGING_CLASS);
        draggedCard = null;
        topSection.classList.remove(DRAG_OVER_CLASS);
        bottomSection.classList.remove(DRAG_OVER_CLASS);
    }

    /**
     * Drag over handler
     * @this {HTMLElement}
     */
    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        this.classList.add(DRAG_OVER_CLASS);
    }

    /**
     * Drag leave handler
     * @this {HTMLElement}
     */
    function handleDragLeave(e) {
        this.classList.remove(DRAG_OVER_CLASS);
    }

    /**
     * Drop handler
     * @this {HTMLElement}
     */
    function handleDrop(e) {
        e.preventDefault();
        this.classList.remove(DRAG_OVER_CLASS);

        if (!draggedCard) return;

        const targetRow = this.querySelector(CARD_ROW_SELECTOR);
        if (targetRow && draggedCard.parentElement !== targetRow) {
            targetRow.appendChild(draggedCard);
            saveState();
        }
    }

    /**
     * Double click handler - returns card to bottom section
     * @this {HTMLElement}
     */
    function handleDoubleClick(e) {
        if (this.parentElement === topRow) {
            returnCardToBottom(this);
        }
    }

    /**
     * Returns card to bottom section preserving original order
     * @param {HTMLElement} card - Card to return
     */
    function returnCardToBottom(card) {
        const value = card.dataset.value;
        const index = originalOrder.indexOf(value);
        
        const cards = Array.from(bottomRow.querySelectorAll('.card'));
        let inserted = false;
        
        for (let i = 0; i < cards.length; i++) {
            const cardValue = cards[i].dataset.value;
            const currentIndex = originalOrder.indexOf(cardValue);
            
            if (currentIndex > index) {
                bottomRow.insertBefore(card, cards[i]);
                inserted = true;
                break;
            }
        }
        
        if (!inserted) {
            bottomRow.appendChild(card);
        }
        
        saveState();
    }
    
    function saveState() {
        const topCards = Array.from(topRow.querySelectorAll('.card')).map(c => c.dataset.value);
        const bottomCards = Array.from(bottomRow.querySelectorAll('.card')).map(c => c.dataset.value);
        
        const state = {
            top: topCards,
            bottom: bottomCards
        };
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
    
    function loadState() {
        const saved = localStorage.getItem(STORAGE_KEY);
        
        if (saved) {
            try {
                const state = JSON.parse(saved);
                
                state.top.forEach(value => {
                    topRow.appendChild(createCard(value));
                });
                
                state.bottom.forEach(value => {
                    bottomRow.appendChild(createCard(value));
                });
                
                return true;
            } catch (e) {
                console.error('Failed to load state:', e);
            }
        }
        
        return false;
    }
    
    function initGame() {
        const loaded = loadState();
        
        if (!loaded) {
            INITIAL_CARDS.forEach(value => {
                bottomRow.appendChild(createCard(value));
            });
        }
        
        topSection.addEventListener('dragover', handleDragOver);
        topSection.addEventListener('dragleave', handleDragLeave);
        topSection.addEventListener('drop', handleDrop);
        
        bottomSection.addEventListener('dragover', handleDragOver);
        bottomSection.addEventListener('dragleave', handleDragLeave);
        bottomSection.addEventListener('drop', handleDrop);
    }
    
    initGame();
});
