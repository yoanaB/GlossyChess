var chessGame = (function () {
    // var gameInstance;
    this.cells = [];
    //this.game = null;
    var self = this;

    function init(connection) {
        console.log('connection in int: ', connection);
        var conn = connection;
        self.game = new Phaser.Game(700, 700, Phaser.AUTO, 'myCanvas', {preload: preload, create: create});

        function preload() {
            this.game.load.image('board', 'images/CHW31-2.gif');
            this.game.load.image('bishop_black', 'images/bishop_black.png');
            this.game.load.image('bishop_white', 'images/bishop_white.png');
            this.game.load.image('king_black', 'images/king_black.png');
            this.game.load.image('king_white', 'images/king_white.png');
            this.game.load.image('knight_black', 'images/knight_black.png');
            this.game.load.image('knight_white', 'images/knight_white.png');
            this.game.load.image('pawn_black', 'images/pawn.png');
            this.game.load.image('pawn_white', 'images/pawn_white.png');
            this.game.load.image('queen_black', 'images/queen_black.png');
            this.game.load.image('queen_white', 'images/queen_white.png');
            this.game.load.image('rook_black', 'images/rook_black.png');
            this.game.load.image('rook_white', 'images/rook_white.png');
            this.game.load.image('cell', 'images/cell_active.png');
        }

        var CELL_PIXELS = 74;
        var START_PIXELS = 54;
        var CELL_ROWS = 8;

        function create() {
            this.game.board = this.game.add.image(0, 0, 'board');
            //board.name = 'board';
            this.game.inputEnabled = true;
            var i = 0,
                j = 0;
            var horizontals = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            for (var y = START_PIXELS; y < CELL_PIXELS * 8; y += CELL_PIXELS) {
                j = 0;
                cells[i] = [];

                for (var x = START_PIXELS; x < CELL_PIXELS * 8; x += CELL_PIXELS) {
                    var cell = this.game.add.image(x + 2, y + 3, 'cell');
                    cell.name = 'cell';
                    var coordinates = horizontals[j] + (7 - i + 1);

                    var cellBoard = new Cell(this.game, x, y, coordinates, cell);
                    //var parent = cell;
                    cell.visible = false;
                    cell.inputEnabled = true;
                    if (i == 1) {
                        //console.log(coordinates, Math.floor(x / CELL_PIXELS));
                        var oppositePawn = this.game.add.image(x - 2, y + 2, 'pawn_black');
                        var oppositePawnFigure = new Pawn(this.game, cellBoard, coordinates, oppositePawn, true, '&#9823;');
                        oppositePawn.inputEnabled = true;
                        cellBoard.setFigure(oppositePawnFigure);
                        //cell.addChild(whitePawn);
                    }
                    if (i == 6) {
                        var myPawn = this.game.add.image(x - 2, y + 2, 'pawn_white');
                        var myPawnFigure = new Pawn(this.game, cellBoard, coordinates, myPawn, false, '&#9823;');
                        myPawn.inputEnabled = true;
                        cellBoard.setFigure(myPawnFigure);
                    }
                    if (i == 0) {
                        if (j == 0 || j == 7) {
                            var oppositeRook = this.game.add.image(x - 2, y + 2, 'rook_black');
                            var oppositeRookFigure = new Rook(this.game, cellBoard, coordinates, oppositeRook, true, '&#9820;');
                            oppositeRook.inputEnabled = true;
                            cellBoard.setFigure(oppositeRookFigure);
                        }
                        if (j == 1 || j == 6) {
                            var oppositeKnight = this.game.add.image(x - 2, y + 2, 'knight_black');
                            var oppositeKnightFigure = new Knight(this.game, cellBoard, coordinates, oppositeKnight, true, '&#9822;');
                            oppositeKnight.inputEnabled = true;
                            cellBoard.setFigure(oppositeKnightFigure);
                        }
                        if (j == 2 || j == 5) {
                            var oppositeBishop = this.game.add.image(x - 2, y + 2, 'bishop_black');
                            var oppositeBishopFigure = new Bishop(this.game, cellBoard, coordinates, oppositeBishop, true, '&#9821;');
                            oppositeBishop.inputEnabled = true;
                            cellBoard.setFigure(oppositeBishopFigure);
                        }
                        if (j == 4) {
                            var oppositeQueen = this.game.add.image(x - 2, y + 2, 'queen_black');
                            var oppositeQueenFigure = new Queen(this.game, cellBoard, coordinates, oppositeQueen, true, '&#9819;');
                            cellBoard.setFigure(oppositeQueenFigure);
                        }
                        if (j == 3) {
                            var oppositeKing = this.game.add.image(x - 2, y + 2, 'king_black');
                            var oppositeKingFigure = new King(this.game, cellBoard, coordinates, oppositeKing, true, '&#9818;');
                            oppositeKing.inputEnabled = true;
                            cellBoard.setFigure(oppositeKingFigure);
                        }
                    }
                    if (i == 7) {
                        if (j == 0 || j == 7) {
                            var myRook = this.game.add.image(x - 2, y + 2, 'rook_white');
                            var myRookFigure = new Rook(this.game, cellBoard, coordinates, myRook, false, '&#9820;');
                            myRook.inputEnabled = true;
                            cellBoard.setFigure(myRookFigure);
                        }
                        if (j == 1 || j == 6) {
                            var myKnight = this.game.add.image(x - 2, y + 2, 'knight_white');
                            var myKnightFigure = new Knight(this.game, cellBoard, coordinates, myKnight, false, '&#9822;');
                            myKnight.inputEnabled = true;
                            cellBoard.setFigure(myKnightFigure);
                        }
                        if (j == 2 || j == 5) {
                            var myBishop = this.game.add.image(x - 2, y + 2, 'bishop_white');
                            var myBishopFigure = new Bishop(this.game, cellBoard, coordinates, myBishop, false, '&#9821;');
                            myBishop.inputEnabled = true;
                            cellBoard.setFigure(myBishopFigure);
                        }
                        if (j == 3) {
                            var myQueen = this.game.add.image(x - 2, y + 2, 'queen_white');
                            var myQueenFigure = new Queen(this.game, cellBoard, coordinates, myQueen, false, '&#9819;');
                            myQueen.inputEnabled = true;
                            cellBoard.setFigure(myQueenFigure);
                        }
                        if (j == 4) {
                            var myKing = this.game.add.image(x - 2, y + 2, 'king_white');
                            var myKingFigure = new King(this.game, cellBoard, coordinates, myKing, false, '&#9818;');
                            myKing.inputEnabled = true;
                            cellBoard.setFigure(myKingFigure);
                        }
                    }

                    /*  (function (cell) {
                     cell.events.onInputDown.add(function () {
                     cell.visible = false;
                     }, this);
                     //console.log(cellBoard.getCoordinates());
                     })(cellBoard.getImage());*/
                    cells[i][j] = cellBoard;


                    j++;
                }
                i++;
            }
            //cellAt('');
            initializeFigures(connection);
            //console.log(cells);
        }

        self.game.cellAt = function (position) {
            var found = false;
            var cell = {};
            for (var i = 0; i < CELL_ROWS; i++) {
                for (var j = 0; j < CELL_ROWS; j++) {
                    if (cells[i][j].getCoordinates() === position) {
                        found = true;
                        cell = cells[i][j];
                        break;
                    }
                }
            }

            return cell;
        }

        //console.log(cells);

        function initializeFigures(conn) {
            console.log('initialize figures in gameController', conn);
            for (var i = 0; i < CELL_ROWS; i++) {
                for (var j = 0; j < CELL_ROWS; j++) {
                    var cell = cells[i][j];

                    (function (cell) {
                        if (cell.getFigure() != null && !cell.getFigure().getIsOpposite()) {
                            var figureImage = cell.getFigure().getImage();
                            figureImage.events.onInputDown.add(function () {
                                this.currentFigure.readyToMove(self.game);
                                this.currentFigure.move(self.game, cells, conn);

                            }, {currentFigure: cell.getFigure()})

                        }
                    })(cell);

                }
            }
        };


    }

    function updateFigurePosition(response) {
        var charCode = response.moveCharcode;
        var oldPosition = charCode.split(' ')[0];
        var newPosition = charCode.split(' ')[1];

        var oldCell = self.game.cellAt(oldPosition);
        var newCell = self.game.cellAt(newPosition);

        var currentFigure = oldCell.getFigure();
        var currentFigureImage = oldCell.getFigure().getImage();

        if (newCell.getFigure() != null && !newCell.getFigure().getIsOpposite()) {
            newCell.getFigure().getImage().destroy();
            document.getElementById('opposite-taken-figures').innerHTML = newCell.getFigure().getFont();
        }

        var animation = game.add.tween(currentFigureImage);
        animation.to({
            x: newCell.getImage().x,
            y: newCell.getImage().y
        }, 1500, Phaser.Easing.Linear.In, true);
        animation.start();
        newCell.setFigure(currentFigure);
        currentFigure.setCell(newCell);
        currentFigure.setActiveCells([]);
        oldCell.setFigure(null);


        if (response.mattResponse.matt) {
            var text = game.add.text(game.world.centerX, game.world.centerY, 'You lose!', {
                font: '64px Arial',
                fill: 'red'
            });
            text.anchor.set(0.5);

            for(var i = 0; i < 8; i++){
                for(var j = 0; j < 8; j++){
                    if(cells[i][j].getFigure() !== null){
                        cells[i][j].getFigure().getImage().inputEnabled = false;
                    }
                }
            }
        }
    }

    return {
        init: init,
        updateFigurePosition: updateFigurePosition
    }
})
();