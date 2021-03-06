var King = (function (parent) {

    function King(game, cell, chessCoordinates, image, isOpposite, font) {

        parent.call(this, game, cell, chessCoordinates, image, isOpposite, font);

    }

    King.prototype = Object.create(parent.prototype);
    King.prototype.constructor = King;

    King.prototype.readyToMove = function(board){
        var cell = this.getCell();
        var position = cell.getCoordinates();
        var horizontal = parseInt(position.charAt(1));
        var vertical = position.charAt(0);
        var verticalIndex = vertical.charCodeAt(0);
        var asciiCodeOfA = 'a'.charCodeAt(0);
        var asciiCodeOfH = 'h'.charCodeAt(0);
        var activeCells = [];
        //console.log(board.cellAt(String.fromCharCode(verticalIndex - 1) + horizontal));
        if(verticalIndex + 1 <= asciiCodeOfH){
            var currentCell = board.cellAt(String.fromCharCode(verticalIndex + 1) + horizontal);
            if(currentCell.getFigure() == null || (currentCell.getFigure() !== null && currentCell.getFigure().getIsOpposite())){
                activeCells.push(currentCell);
            }

        }
        if(verticalIndex - 1 >= asciiCodeOfA){
            var currentCell = board.cellAt(String.fromCharCode(verticalIndex - 1) + horizontal);
            if(currentCell.getFigure() == null || (currentCell.getFigure() !== null && currentCell.getFigure().getIsOpposite())){
                activeCells.push(currentCell);
            }
        }
        for(var i = verticalIndex - 1; i <= verticalIndex + 1 && i <= asciiCodeOfH && i >= asciiCodeOfA; i++){
            //console.log(board.cellAt(String.fromCharCode(i) + (horizontal - 1)));
            if(horizontal - 1 > 0){
                var currentCell = board.cellAt(String.fromCharCode(i) + (horizontal - 1));
                if(currentCell.getFigure() == null || (currentCell.getFigure() !== null && currentCell.getFigure().getIsOpposite())){
                    activeCells.push(currentCell);
                }
            }
        }
        for(var i = verticalIndex - 1; i <= verticalIndex + 1 && i <= asciiCodeOfH && i >= asciiCodeOfA; i++){
            if(horizontal + 1 < 9){
                var currentCell = board.cellAt(String.fromCharCode(i) + (horizontal + 1));
                if(currentCell.getFigure() == null || (currentCell.getFigure() !== null && currentCell.getFigure().getIsOpposite())){
                    activeCells.push(currentCell);
                }
            }
        }

        for (var i = 0; i < activeCells.length; i++) {
            activeCells[i].getImage().visible = true;
        }

        this.setActiveCells(activeCells);

        return activeCells;
    }

    return King;

}(Figure))