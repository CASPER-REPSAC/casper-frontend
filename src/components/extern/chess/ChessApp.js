import React, { Component } from "react";
import "components/extern/chess/style.scss";

export default class ChessApp extends Component {
  componentDidMount() {
    var __assign =
      (this && this.__assign) ||
      function () {
        __assign =
          Object.assign ||
          function (t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
          };
        return __assign.apply(this, arguments);
      };
    console.clear();
    // var PIECE_DIR_CALC = 0;
    var Utils = /** @class */ (function () {
      function Utils() {}
      Utils.colToInt = function (col) {
        return Board.COLS.indexOf(col);
      };
      Utils.rowToInt = function (row) {
        return Board.ROWS.indexOf(row);
      };
      Utils.intToCol = function (int) {
        return Board.COLS[int];
      };
      Utils.intToRow = function (int) {
        return Board.ROWS[int];
      };
      Utils.getPositionsFromShortCode = function (shortCode) {
        var positions = Utils.getInitialPiecePositions();
        var overrides = {};
        var defaultPositionMode = shortCode.charAt(0) === "X";
        if (defaultPositionMode) {
          shortCode = shortCode.slice(1);
        }
        shortCode.split(",").forEach(function (string) {
          var promoted = string.charAt(0) === "P";
          if (promoted) {
            string = string.slice(1);
          }
          if (defaultPositionMode) {
            var inactive = string.length === 3;
            var id = string.slice(0, 2);
            var col = inactive ? undefined : string.charAt(2);
            var row = inactive ? undefined : string.charAt(3);
            var moves = string.charAt(4) || "1";
            overrides[id] = {
              col: col,
              row: row,
              active: !inactive,
              _moves: parseInt(moves),
              _promoted: promoted,
            };
          } else {
            var moved = string.length >= 4;
            id = string.slice(0, 2);
            col = string.charAt(moved ? 2 : 0);
            row = string.charAt(moved ? 3 : 1);
            moves = string.charAt(4) || moved ? "1" : "0";
            overrides[id] = {
              col: col,
              row: row,
              active: true,
              _moves: parseInt(moves),
              _promoted: promoted,
            };
          }
        });
        for (var id in positions) {
          if (overrides[id]) {
            positions[id] = overrides[id];
          } else {
            positions[id] = defaultPositionMode
              ? positions[id]
              : { active: false };
          }
        }
        return positions;
      };
      Utils.getInitialBoardPieces = function (parent, pieces) {
        var boardPieces = {};
        var container = document.createElement("div");
        container.className = "pieces";
        parent.appendChild(container);
        for (var pieceId in pieces) {
          var boardPiece = document.createElement("div");
          boardPiece.className =
            "piece " + pieces[pieceId].data.player.toLowerCase();
          boardPiece.innerHTML = pieces[pieceId].shape();
          container.appendChild(boardPiece);
          boardPieces[pieceId] = boardPiece;
        }
        return boardPieces;
      };
      Utils.getInitialBoardTiles = function (parent, handler) {
        var tiles = { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, 8: {} };
        var board = document.createElement("div");
        board.className = "board";
        parent.appendChild(board);
        for (var i = 0; i < 8; i++) {
          var row = document.createElement("div");
          row.className = "row";
          board.appendChild(row);
          var _loop_1 = function (j) {
            var tile = document.createElement("button");
            tile.className = "tile";
            var r = Utils.intToRow(i);
            var c = Utils.intToCol(j);
            tile.addEventListener("click", function () {
              return handler({ row: r, col: c });
            });
            row.appendChild(tile);
            tiles[r][c] = tile;
          };
          for (var j = 0; j < 8; j++) {
            _loop_1(j);
          }
        }
        return tiles;
      };
      Utils.getInitialBoardState = function (construct) {
        if (construct === void 0) {
          construct = function () {
            return undefined;
          };
        }
        var blankRow = function () {
          return {
            A: construct(),
            B: construct(),
            C: construct(),
            D: construct(),
            E: construct(),
            F: construct(),
            G: construct(),
            H: construct(),
          };
        };
        return {
          1: __assign({}, blankRow()),
          2: __assign({}, blankRow()),
          3: __assign({}, blankRow()),
          4: __assign({}, blankRow()),
          5: __assign({}, blankRow()),
          6: __assign({}, blankRow()),
          7: __assign({}, blankRow()),
          8: __assign({}, blankRow()),
        };
      };
      Utils.getInitialPiecePositions = function () {
        return {
          A8: { active: true, row: "8", col: "A" },
          B8: { active: true, row: "8", col: "B" },
          C8: { active: true, row: "8", col: "C" },
          D8: { active: true, row: "8", col: "D" },
          E8: { active: true, row: "8", col: "E" },
          F8: { active: true, row: "8", col: "F" },
          G8: { active: true, row: "8", col: "G" },
          H8: { active: true, row: "8", col: "H" },
          A7: { active: true, row: "7", col: "A" },
          B7: { active: true, row: "7", col: "B" },
          C7: { active: true, row: "7", col: "C" },
          D7: { active: true, row: "7", col: "D" },
          E7: { active: true, row: "7", col: "E" },
          F7: { active: true, row: "7", col: "F" },
          G7: { active: true, row: "7", col: "G" },
          H7: { active: true, row: "7", col: "H" },
          A2: { active: true, row: "2", col: "A" },
          B2: { active: true, row: "2", col: "B" },
          C2: { active: true, row: "2", col: "C" },
          D2: { active: true, row: "2", col: "D" },
          E2: { active: true, row: "2", col: "E" },
          F2: { active: true, row: "2", col: "F" },
          G2: { active: true, row: "2", col: "G" },
          H2: { active: true, row: "2", col: "H" },
          A1: { active: true, row: "1", col: "A" },
          B1: { active: true, row: "1", col: "B" },
          C1: { active: true, row: "1", col: "C" },
          D1: { active: true, row: "1", col: "D" },
          E1: { active: true, row: "1", col: "E" },
          F1: { active: true, row: "1", col: "F" },
          G1: { active: true, row: "1", col: "G" },
          H1: { active: true, row: "1", col: "H" },
        };
      };
      Utils.getInitialPieces = function () {
        return {
          A8: new Piece({ id: "A8", player: "BLACK", type: "ROOK" }),
          B8: new Piece({ id: "B8", player: "BLACK", type: "KNIGHT" }),
          C8: new Piece({ id: "C8", player: "BLACK", type: "BISHOP" }),
          D8: new Piece({ id: "D8", player: "BLACK", type: "QUEEN" }),
          E8: new Piece({ id: "E8", player: "BLACK", type: "KING" }),
          F8: new Piece({ id: "F8", player: "BLACK", type: "BISHOP" }),
          G8: new Piece({ id: "G8", player: "BLACK", type: "KNIGHT" }),
          H8: new Piece({ id: "H8", player: "BLACK", type: "ROOK" }),
          A7: new Piece({ id: "A7", player: "BLACK", type: "PAWN" }),
          B7: new Piece({ id: "B7", player: "BLACK", type: "PAWN" }),
          C7: new Piece({ id: "C7", player: "BLACK", type: "PAWN" }),
          D7: new Piece({ id: "D7", player: "BLACK", type: "PAWN" }),
          E7: new Piece({ id: "E7", player: "BLACK", type: "PAWN" }),
          F7: new Piece({ id: "F7", player: "BLACK", type: "PAWN" }),
          G7: new Piece({ id: "G7", player: "BLACK", type: "PAWN" }),
          H7: new Piece({ id: "H7", player: "BLACK", type: "PAWN" }),
          A2: new Piece({ id: "A2", player: "WHITE", type: "PAWN" }),
          B2: new Piece({ id: "B2", player: "WHITE", type: "PAWN" }),
          C2: new Piece({ id: "C2", player: "WHITE", type: "PAWN" }),
          D2: new Piece({ id: "D2", player: "WHITE", type: "PAWN" }),
          E2: new Piece({ id: "E2", player: "WHITE", type: "PAWN" }),
          F2: new Piece({ id: "F2", player: "WHITE", type: "PAWN" }),
          G2: new Piece({ id: "G2", player: "WHITE", type: "PAWN" }),
          H2: new Piece({ id: "H2", player: "WHITE", type: "PAWN" }),
          A1: new Piece({ id: "A1", player: "WHITE", type: "ROOK" }),
          B1: new Piece({ id: "B1", player: "WHITE", type: "KNIGHT" }),
          C1: new Piece({ id: "C1", player: "WHITE", type: "BISHOP" }),
          D1: new Piece({ id: "D1", player: "WHITE", type: "QUEEN" }),
          E1: new Piece({ id: "E1", player: "WHITE", type: "KING" }),
          F1: new Piece({ id: "F1", player: "WHITE", type: "BISHOP" }),
          G1: new Piece({ id: "G1", player: "WHITE", type: "KNIGHT" }),
          H1: new Piece({ id: "H1", player: "WHITE", type: "ROOK" }),
        };
      };
      return Utils;
    })();
    var Shape = /** @class */ (function () {
      function Shape() {}
      Shape.shape = function (player, piece) {
        return (
          '<svg class="' +
          player +
          '" width="170" height="170" viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg">\n      <use href="#' +
          piece +
          '" />\n    </svg>'
        );
      };
      Shape.shapeBishop = function (player) {
        return Shape.shape(player, "bishop");
      };
      Shape.shapeKing = function (player) {
        return Shape.shape(player, "king");
      };
      Shape.shapeKnight = function (player) {
        return Shape.shape(player, "knight");
      };
      Shape.shapePawn = function (player) {
        return Shape.shape(player, "pawn");
      };
      Shape.shapeQueen = function (player) {
        return Shape.shape(player, "queen");
      };
      Shape.shapeRook = function (player) {
        return Shape.shape(player, "rook");
      };
      return Shape;
    })();
    var Constraints = /** @class */ (function () {
      function Constraints() {}
      Constraints.generate = function (args, resultingChecks) {
        var method;
        var piecePositions = args.piecePositions,
          piece = args.piece;
        if (piecePositions[piece.data.id].active) {
          switch (piece.data.type) {
            case "BISHOP":
              method = Constraints.constraintsBishop;
              break;
            case "KING":
              method = Constraints.constraintsKing;
              break;
            case "KNIGHT":
              method = Constraints.constraintsKnight;
              break;
            case "PAWN":
              method = Constraints.constraintsPawn;
              break;
            case "QUEEN":
              method = Constraints.constraintsQueen;
              break;
            case "ROOK":
              method = Constraints.constraintsRook;
              break;
            default:
          }
        }
        var result = method ? method(args) : { moves: [], captures: [] };
        if (resultingChecks) {
          var moveIndex_1 = args.moveIndex + 1;
          result.moves = result.moves.filter(function (location) {
            return !resultingChecks({
              piece: piece,
              location: location,
              capture: false,
              moveIndex: moveIndex_1,
            }).length;
          });
          result.captures = result.captures.filter(function (location) {
            return !resultingChecks({
              piece: piece,
              location: location,
              capture: true,
              moveIndex: moveIndex_1,
            }).length;
          });
        }
        return result;
      };
      Constraints.constraintsBishop = function (args) {
        return Constraints.constraintsDiagonal(args);
      };
      Constraints.constraintsDiagonal = function (args) {
        var response = { moves: [], captures: [] };
        var piece = args.piece;
        Constraints.runUntil(piece.dirNW.bind(piece), response, args);
        Constraints.runUntil(piece.dirNE.bind(piece), response, args);
        Constraints.runUntil(piece.dirSW.bind(piece), response, args);
        Constraints.runUntil(piece.dirSE.bind(piece), response, args);
        return response;
      };
      Constraints.constraintsKing = function (args) {
        var piece = args.piece,
          kingCastles = args.kingCastles,
          piecePositions = args.piecePositions;
        var moves = [];
        var captures = [];
        var locations = [
          piece.dirN(1, piecePositions),
          piece.dirNE(1, piecePositions),
          piece.dirE(1, piecePositions),
          piece.dirSE(1, piecePositions),
          piece.dirS(1, piecePositions),
          piece.dirSW(1, piecePositions),
          piece.dirW(1, piecePositions),
          piece.dirNW(1, piecePositions),
        ];
        if (kingCastles) {
          var castles = kingCastles(piece);
          castles.forEach(function (position) {
            return moves.push(position);
          });
        }
        locations.forEach(function (location) {
          var value = Constraints.relationshipToTile(location, args);
          if (value === "BLANK") {
            moves.push(location);
          } else if (value === "ENEMY") {
            captures.push(location);
          }
        });
        return { moves: moves, captures: captures };
      };
      Constraints.constraintsKnight = function (args) {
        var piece = args.piece,
          piecePositions = args.piecePositions;
        var moves = [];
        var captures = [];
        var locations = [
          piece.dir(1, 2, piecePositions),
          piece.dir(1, -2, piecePositions),
          piece.dir(2, 1, piecePositions),
          piece.dir(2, -1, piecePositions),
          piece.dir(-1, 2, piecePositions),
          piece.dir(-1, -2, piecePositions),
          piece.dir(-2, 1, piecePositions),
          piece.dir(-2, -1, piecePositions),
        ];
        locations.forEach(function (location) {
          var value = Constraints.relationshipToTile(location, args);
          if (value === "BLANK") {
            moves.push(location);
          } else if (value === "ENEMY") {
            captures.push(location);
          }
        });
        return { moves: moves, captures: captures };
      };
      Constraints.constraintsOrthangonal = function (args) {
        var piece = args.piece;
        var response = { moves: [], captures: [] };
        Constraints.runUntil(piece.dirN.bind(piece), response, args);
        Constraints.runUntil(piece.dirE.bind(piece), response, args);
        Constraints.runUntil(piece.dirS.bind(piece), response, args);
        Constraints.runUntil(piece.dirW.bind(piece), response, args);
        return response;
      };
      Constraints.constraintsPawn = function (args) {
        var piece = args.piece,
          piecePositions = args.piecePositions;
        var moves = [];
        var captures = [];
        var locationN1 = piece.dirN(1, piecePositions);
        var locationN2 = piece.dirN(2, piecePositions);
        if (Constraints.relationshipToTile(locationN1, args) === "BLANK") {
          moves.push(locationN1);
          if (
            !piece.moves.length &&
            Constraints.relationshipToTile(locationN2, args) === "BLANK"
          ) {
            moves.push(locationN2);
          }
        }
        [
          [piece.dirNW(1, piecePositions), piece.dirW(1, piecePositions)],
          [piece.dirNE(1, piecePositions), piece.dirE(1, piecePositions)],
        ].forEach(function (_a) {
          var location = _a[0],
            enPassant = _a[1];
          var standardCaptureRelationship = Constraints.relationshipToTile(
            location,
            args
          );
          var enPassantCaptureRelationship = Constraints.relationshipToTile(
            enPassant,
            args
          );
          if (standardCaptureRelationship === "ENEMY") {
            captures.push(location);
          } else if (
            piece.moves.length > 0 &&
            enPassantCaptureRelationship === "ENEMY"
          ) {
            var enPassantRow =
              enPassant.row === (piece.playerWhite() ? "5" : "4");
            var other = Constraints.locationToPiece(enPassant, args);
            if (enPassantRow && other && other.data.type === "PAWN") {
              if (
                other.moves.length === 1 &&
                other.moves[0] === args.moveIndex - 1
              ) {
                location.capture = __assign({}, enPassant);
                captures.push(location);
              }
            }
          }
        });
        return { moves: moves, captures: captures };
      };
      Constraints.constraintsQueen = function (args) {
        var diagonal = Constraints.constraintsDiagonal(args);
        var orthagonal = Constraints.constraintsOrthangonal(args);
        return {
          moves: diagonal.moves.concat(orthagonal.moves),
          captures: diagonal.captures.concat(orthagonal.captures),
        };
      };
      Constraints.constraintsRook = function (args) {
        return Constraints.constraintsOrthangonal(args);
      };
      Constraints.locationToPiece = function (location, args) {
        if (!location) {
          return undefined;
        }
        var state = args.state,
          pieces = args.pieces;
        var row = state[location.row];
        var occupyingId = row === undefined ? undefined : row[location.col];
        return pieces[occupyingId];
      };
      Constraints.relationshipToTile = function (location, args) {
        if (!location) {
          return undefined;
        }
        var piece = args.piece;
        var occupying = Constraints.locationToPiece(location, args);
        if (occupying) {
          return occupying.data.player === piece.data.player
            ? "FRIEND"
            : "ENEMY";
        } else {
          return "BLANK";
        }
      };
      Constraints.runUntil = function (locationFunction, response, args) {
        var piecePositions = args.piecePositions;
        var inc = 1;
        var location = locationFunction(inc++, piecePositions);
        while (location) {
          var abort = false;
          var relations = Constraints.relationshipToTile(location, args);
          if (relations === "ENEMY") {
            response.captures.push(location);
            abort = true;
          } else if (relations === "FRIEND") {
            abort = true;
          } else {
            response.moves.push(location);
          }
          if (abort) {
            location = undefined;
          } else {
            location = locationFunction(inc++, piecePositions);
          }
        }
      };
      return Constraints;
    })();
    var Piece = /** @class */ (function () {
      function Piece(data) {
        this.moves = [];
        this.promoted = false;
        this.updateShape = false;
        this.data = data;
      }
      Object.defineProperty(Piece.prototype, "orientation", {
        get: function () {
          return this.data.player === "BLACK" ? -1 : 1;
        },
        enumerable: false,
        configurable: true,
      });
      Piece.prototype.dirN = function (steps, positions) {
        return this.dir(steps, 0, positions);
      };
      Piece.prototype.dirS = function (steps, positions) {
        return this.dir(-steps, 0, positions);
      };
      Piece.prototype.dirW = function (steps, positions) {
        return this.dir(0, -steps, positions);
      };
      Piece.prototype.dirE = function (steps, positions) {
        return this.dir(0, steps, positions);
      };
      Piece.prototype.dirNW = function (steps, positions) {
        return this.dir(steps, -steps, positions);
      };
      Piece.prototype.dirNE = function (steps, positions) {
        return this.dir(steps, steps, positions);
      };
      Piece.prototype.dirSW = function (steps, positions) {
        return this.dir(-steps, -steps, positions);
      };
      Piece.prototype.dirSE = function (steps, positions) {
        return this.dir(-steps, steps, positions);
      };
      Piece.prototype.dir = function (stepsRow, stepsColumn, positions) {
        // PIECE_DIR_CALC++;
        var row =
          Utils.rowToInt(positions[this.data.id].row) +
          this.orientation * stepsRow;
        var col =
          Utils.colToInt(positions[this.data.id].col) +
          this.orientation * stepsColumn;
        if (row >= 0 && row <= 7 && col >= 0 && col <= 7) {
          return { row: Utils.intToRow(row), col: Utils.intToCol(col) };
        }
        return undefined;
      };
      Piece.prototype.move = function (moveIndex) {
        this.moves.push(moveIndex);
      };
      Piece.prototype.options = function (
        moveIndex,
        state,
        pieces,
        piecePositions,
        resultingChecks,
        kingCastles
      ) {
        return Constraints.generate(
          {
            moveIndex: moveIndex,
            state: state,
            piece: this,
            pieces: pieces,
            piecePositions: piecePositions,
            kingCastles: kingCastles,
          },
          resultingChecks
        );
      };
      Piece.prototype.playerBlack = function () {
        return this.data.player === "BLACK";
      };
      Piece.prototype.playerWhite = function () {
        return this.data.player === "WHITE";
      };
      Piece.prototype.promote = function (type) {
        if (type === void 0) {
          type = "QUEEN";
        }
        this.data.type = type;
        this.promoted = true;
        this.updateShape = true;
      };
      Piece.prototype.shape = function () {
        var player = this.data.player.toLowerCase();
        switch (this.data.type) {
          case "BISHOP":
            return Shape.shapeBishop(player);
          case "KING":
            return Shape.shapeKing(player);
          case "KNIGHT":
            return Shape.shapeKnight(player);
          case "PAWN":
            return Shape.shapePawn(player);
          case "QUEEN":
            return Shape.shapeQueen(player);
          case "ROOK":
            return Shape.shapeRook(player);
          default:
        }
      };
      return Piece;
    })();
    var Board = /** @class */ (function () {
      function Board(pieces, piecePositions) {
        this.checksBlack = [];
        this.checksWhite = [];
        this.piecesTilesCaptures = {};
        this.piecesTilesMoves = {};
        this.tilesPiecesBlackCaptures = Utils.getInitialBoardState(function () {
          return [];
        });
        this.tilesPiecesBlackMoves = Utils.getInitialBoardState(function () {
          return [];
        });
        this.tilesPiecesWhiteCaptures = Utils.getInitialBoardState(function () {
          return [];
        });
        this.tilesPiecesWhiteMoves = Utils.getInitialBoardState(function () {
          return [];
        });
        this.pieceIdsBlack = [];
        this.pieceIdsWhite = [];
        this.state = Utils.getInitialBoardState();
        this.pieces = pieces;
        for (var id in pieces) {
          if (pieces[id].playerWhite()) {
            this.pieceIdsWhite.push(id);
          } else {
            this.pieceIdsBlack.push(id);
          }
        }
        this.initializePositions(piecePositions);
      }
      Board.prototype.initializePositions = function (piecePositions) {
        this.piecePositions = piecePositions;
        this.initializeState();
        this.piecesUpdate(0);
      };
      Board.prototype.initializeState = function () {
        for (var pieceId in this.pieces) {
          var _a = this.piecePositions[pieceId],
            row = _a.row,
            col = _a.col,
            active = _a.active,
            _moves = _a._moves,
            _promoted = _a._promoted;
          if (_moves) {
            delete this.piecePositions[pieceId]._moves;
            // TODO: come back to this
            // this.pieces[pieceId].moves = new Array(_moves);
          }
          if (_promoted) {
            delete this.piecePositions[pieceId]._promoted;
            this.pieces[pieceId].promote();
          }
          if (active) {
            this.state[row] = this.state[row] || [];
            this.state[row][col] = pieceId;
          }
        }
      };
      Board.prototype.kingCastles = function (king) {
        var _this = this;
        var castles = [];
        // king has to not have moved
        if (king.moves.length) {
          return castles;
        }
        var kingIsWhite = king.playerWhite();
        var moves = kingIsWhite
          ? this.tilesPiecesBlackMoves
          : this.tilesPiecesWhiteMoves;
        var checkPositions = function (row, rookCol, castles) {
          var cols = rookCol === "A" ? ["D", "C", "B"] : ["F", "G"];
          // rook has to not have moved
          var rookId = "" + rookCol + row;
          var rook = _this.pieces[rookId];
          var active = _this.piecePositions[rookId].active;
          if (active && rook.moves.length === 0) {
            var canCastle_1 = true;
            cols.forEach(function (col) {
              // each tile has to be empty
              if (_this.state[row][col]) {
                canCastle_1 = false;
                // each tile cant be in the path of the other team
              } else if (moves[row][col].length) {
                canCastle_1 = false;
              }
            });
            if (canCastle_1) {
              castles.push({ col: cols[1], row: row, castles: rookCol });
            }
          }
        };
        var row = kingIsWhite ? "1" : "8";
        if (!this.pieces["A" + row].moves.length) {
          checkPositions(row, "A", castles);
        }
        if (!this.pieces["H" + row].moves.length) {
          checkPositions(row, "H", castles);
        }
        return castles;
      };
      Board.prototype.kingCheckStates = function (
        kingPosition,
        captures,
        piecePositions
      ) {
        var col = kingPosition.col,
          row = kingPosition.row;
        return captures[row][col]
          .map(function (id) {
            return piecePositions[id];
          })
          .filter(function (pos) {
            return pos.active;
          });
      };
      Board.prototype.pieceCalculateMoves = function (
        pieceId,
        moveIndex,
        state,
        piecePositions,
        piecesTilesCaptures,
        piecesTilesMoves,
        tilesPiecesCaptures,
        tilesPiecesMoves,
        resultingChecks,
        kingCastles
      ) {
        var _a = this.pieces[pieceId].options(
            moveIndex,
            state,
            this.pieces,
            piecePositions,
            resultingChecks,
            kingCastles
          ),
          captures = _a.captures,
          moves = _a.moves;
        piecesTilesCaptures[pieceId] = Array.from(captures);
        piecesTilesMoves[pieceId] = Array.from(moves);
        captures.forEach(function (_a) {
          var col = _a.col,
            row = _a.row;
          return tilesPiecesCaptures[row][col].push(pieceId);
        });
        moves.forEach(function (_a) {
          var col = _a.col,
            row = _a.row;
          return tilesPiecesMoves[row][col].push(pieceId);
        });
      };
      Board.prototype.pieceCapture = function (piece) {
        var pieceId = piece.data.id;
        var _a = this.piecePositions[pieceId],
          col = _a.col,
          row = _a.row;
        this.state[row][col] = undefined;
        delete this.piecePositions[pieceId].col;
        delete this.piecePositions[pieceId].row;
        this.piecePositions[pieceId].active = false;
      };
      Board.prototype.pieceMove = function (piece, location) {
        var pieceId = piece.data.id;
        var _a = this.piecePositions[pieceId],
          row = _a.row,
          col = _a.col;
        this.state[row][col] = undefined;
        this.state[location.row][location.col] = pieceId;
        this.piecePositions[pieceId].row = location.row;
        this.piecePositions[pieceId].col = location.col;
        if (
          piece.data.type === "PAWN" &&
          (location.row === "8" || location.row === "1")
        ) {
          piece.promote();
        }
      };
      Board.prototype.piecesUpdate = function (moveIndex) {
        var _this = this;
        this.tilesPiecesBlackCaptures = Utils.getInitialBoardState(function () {
          return [];
        });
        this.tilesPiecesBlackMoves = Utils.getInitialBoardState(function () {
          return [];
        });
        this.tilesPiecesWhiteCaptures = Utils.getInitialBoardState(function () {
          return [];
        });
        this.tilesPiecesWhiteMoves = Utils.getInitialBoardState(function () {
          return [];
        });
        this.pieceIdsBlack.forEach(function (id) {
          return _this.pieceCalculateMoves(
            id,
            moveIndex,
            _this.state,
            _this.piecePositions,
            _this.piecesTilesCaptures,
            _this.piecesTilesMoves,
            _this.tilesPiecesBlackCaptures,
            _this.tilesPiecesBlackMoves,
            _this.resultingChecks.bind(_this),
            _this.kingCastles.bind(_this)
          );
        });
        this.pieceIdsWhite.forEach(function (id) {
          return _this.pieceCalculateMoves(
            id,
            moveIndex,
            _this.state,
            _this.piecePositions,
            _this.piecesTilesCaptures,
            _this.piecesTilesMoves,
            _this.tilesPiecesWhiteCaptures,
            _this.tilesPiecesWhiteMoves,
            _this.resultingChecks.bind(_this),
            _this.kingCastles.bind(_this)
          );
        });
        this.checksBlack = this.kingCheckStates(
          this.piecePositions.E1,
          this.tilesPiecesBlackCaptures,
          this.piecePositions
        );
        this.checksWhite = this.kingCheckStates(
          this.piecePositions.E8,
          this.tilesPiecesWhiteCaptures,
          this.piecePositions
        );
      };
      Board.prototype.resultingChecks = function (_a) {
        var _this = this;
        var piece = _a.piece,
          location = _a.location,
          capture = _a.capture,
          moveIndex = _a.moveIndex;
        var tilesPiecesCaptures = Utils.getInitialBoardState(function () {
          return [];
        });
        var tilesPiecesMoves = Utils.getInitialBoardState(function () {
          return [];
        });
        var piecesTilesCaptures = {};
        var piecesTilesMoves = {};
        var state = JSON.parse(JSON.stringify(this.state));
        var piecePositions = JSON.parse(JSON.stringify(this.piecePositions));
        if (capture) {
          var loc = location.capture || location;
          var capturedId = state[loc.row][loc.col];
          if (this.pieces[capturedId].data.type === "KING") {
            // this is a checking move
          } else {
            delete piecePositions[capturedId].col;
            delete piecePositions[capturedId].row;
            piecePositions[capturedId].active = false;
          }
        }
        var pieceId = piece.data.id;
        var _b = piecePositions[pieceId],
          row = _b.row,
          col = _b.col;
        state[row][col] = undefined;
        state[location.row][location.col] = pieceId;
        piecePositions[pieceId].row = location.row;
        piecePositions[pieceId].col = location.col;
        var ids = piece.playerWhite() ? this.pieceIdsBlack : this.pieceIdsWhite;
        var king = piece.playerWhite() ? piecePositions.E1 : piecePositions.E8;
        ids.forEach(function (id) {
          return _this.pieceCalculateMoves(
            id,
            moveIndex,
            state,
            piecePositions,
            piecesTilesCaptures,
            piecesTilesMoves,
            tilesPiecesCaptures,
            tilesPiecesMoves
          );
        });
        return this.kingCheckStates(king, tilesPiecesCaptures, piecePositions);
      };
      Board.prototype.tileEach = function (callback) {
        var _this = this;
        Board.ROWS.forEach(function (row) {
          Board.COLS.forEach(function (col) {
            var piece = _this.tileFind({ row: row, col: col });
            var moves = piece
              ? _this.piecesTilesMoves[piece.data.id]
              : undefined;
            var captures = piece
              ? _this.piecesTilesCaptures[piece.data.id]
              : undefined;
            callback({ row: row, col: col }, piece, moves, captures);
          });
        });
      };
      Board.prototype.tileFind = function (_a) {
        var row = _a.row,
          col = _a.col;
        var id = this.state[row][col];
        return this.pieces[id];
      };
      Board.prototype.toShortCode = function () {
        var positionsAbsolute = [];
        var positionsDefaults = [];
        for (var id in this.piecePositions) {
          var _a = this.piecePositions[id],
            active = _a.active,
            col = _a.col,
            row = _a.row;
          var pos = "" + col + row;
          var moves = this.pieces[id].moves;
          var promotedCode = this.pieces[id].promoted ? "P" : "";
          var movesCode = moves > 9 ? "9" : moves > 1 ? moves.toString() : "";
          if (active) {
            positionsAbsolute.push(
              "" + promotedCode + id + (id === pos ? "" : pos) + movesCode
            );
            if (id !== pos || moves > 0) {
              positionsDefaults.push("" + promotedCode + id + pos + movesCode);
            }
          } else {
            if (id !== "BQ" && id !== "WQ") {
              positionsDefaults.push("" + promotedCode + id + "X");
            }
          }
        }
        var pA = positionsAbsolute.join(",");
        var pD = positionsDefaults.join(",");
        return pA.length > pD.length ? "X" + pD : pA;
      };
      Board.COLS = ["A", "B", "C", "D", "E", "F", "G", "H"];
      Board.ROWS = ["1", "2", "3", "4", "5", "6", "7", "8"];
      return Board;
    })();
    var Game = /** @class */ (function () {
      function Game(pieces, piecePositions, turn) {
        if (turn === void 0) {
          turn = "WHITE";
        }
        this.active = null;
        this.activePieceOptions = [];
        this.moveIndex = 0;
        this.moves = [];
        this.turn = turn;
        this.board = new Board(pieces, piecePositions);
      }
      Game.prototype.activate = function (location) {
        var tilePiece = this.board.tileFind(location);
        if (tilePiece && !this.active && tilePiece.data.player !== this.turn) {
          this.active = null;
          return { type: "INVALID" };
          // a piece is active rn
        } else if (this.active) {
          var activePieceId = this.active.data.id;
          this.active = null;
          var validatedPosition = this.activePieceOptions.find(function (
            option
          ) {
            return option.col === location.col && option.row === location.row;
          });
          var positionIsValid = !!validatedPosition;
          this.activePieceOptions = [];
          var capturePiece = (
            validatedPosition === null || validatedPosition === void 0
              ? void 0
              : validatedPosition.capture
          )
            ? this.board.tileFind(validatedPosition.capture)
            : tilePiece;
          // a piece is on the tile
          if (capturePiece) {
            var capturedPieceId = capturePiece.data.id;
            // cancelling the selected piece on invalid location
            if (capturedPieceId === activePieceId) {
              return { type: "CANCEL" };
            } else if (positionIsValid) {
              // capturing the selected piece
              this.capture(activePieceId, capturedPieceId, location);
              return {
                type: "CAPTURE",
                activePieceId: activePieceId,
                capturedPieceId: capturedPieceId,
                captures: [location],
              };
              // cancel
            } else if (capturePiece.data.player !== this.turn) {
              return { type: "CANCEL" };
            } else {
              // proceed to TOUCH or CANCEL
            }
          } else if (positionIsValid) {
            // moving will return castled if that happens (only two move)
            var castledId = this.move(activePieceId, location);
            return {
              type: "MOVE",
              activePieceId: activePieceId,
              moves: [location],
              castledId: castledId,
            };
            // invalid spot. cancel.
          } else {
            return { type: "CANCEL" };
          }
        }
        // no piece selected or new CANCEL + TOUCH
        if (tilePiece) {
          var tilePieceId = tilePiece.data.id;
          var moves = this.board.piecesTilesMoves[tilePieceId];
          var captures = this.board.piecesTilesCaptures[tilePieceId];
          if (!moves.length && !captures.length) {
            return { type: "INVALID" };
          }
          this.active = tilePiece;
          this.activePieceOptions = moves.concat(captures);
          return {
            type: "TOUCH",
            captures: captures,
            moves: moves,
            activePieceId: tilePieceId,
          };
          // cancelling
        } else {
          this.activePieceOptions = [];
          return { type: "CANCEL" };
        }
      };
      Game.prototype.capture = function (
        capturingPieceId,
        capturedPieceId,
        location
      ) {
        var captured = this.board.pieces[capturedPieceId];
        this.board.pieceCapture(captured);
        this.move(capturingPieceId, location, true);
      };
      Game.prototype.handleCastling = function (piece, location) {
        if (
          piece.data.type !== "KING" ||
          piece.moves.length ||
          location.row !== (piece.playerWhite() ? "1" : "8") ||
          (location.col !== "C" && location.col !== "G")
        ) {
          return;
        }
        return "" + (location.col === "C" ? "A" : "H") + location.row;
      };
      Game.prototype.move = function (pieceId, location, capture) {
        if (capture === void 0) {
          capture = false;
        }
        var piece = this.board.pieces[pieceId];
        var castledId = this.handleCastling(piece, location);
        piece.move(this.moveIndex);
        if (castledId) {
          var castled = this.board.pieces[castledId];
          castled.move(this.moveIndex);
          this.board.pieceMove(castled, {
            col: location.col === "C" ? "D" : "F",
            row: location.row,
          });
          this.moves.push(pieceId + "O" + location.col + location.row);
        } else {
          this.moves.push(
            "" + pieceId + (capture ? "x" : "") + location.col + location.row
          );
        }
        this.moveIndex++;
        this.board.pieceMove(piece, location);
        this.turn = this.turn === "WHITE" ? "BLACK" : "WHITE";
        this.board.piecesUpdate(this.moveIndex);
        var state = this.moveResultState();
        console.log(state);
        if (!state.moves && !state.captures) {
          alert(
            state.stalemate
              ? "Stalemate!"
              : (this.turn === "WHITE" ? "Black" : "White") + " Wins!"
          );
        }
        return castledId;
      };
      Game.prototype.moveResultState = function () {
        var _this = this;
        var movesWhite = 0;
        var capturesWhite = 0;
        var movesBlack = 0;
        var capturesBlack = 0;
        this.board.tileEach(function (_a) {
          var row = _a.row,
            col = _a.col;
          movesWhite += _this.board.tilesPiecesWhiteMoves[row][col].length;
          capturesWhite +=
            _this.board.tilesPiecesWhiteCaptures[row][col].length;
          movesBlack += _this.board.tilesPiecesBlackMoves[row][col].length;
          capturesBlack +=
            _this.board.tilesPiecesBlackCaptures[row][col].length;
        });
        var activeBlack = this.board.pieceIdsBlack.filter(function (pieceId) {
          return _this.board.piecePositions[pieceId].active;
        }).length;
        var activeWhite = this.board.pieceIdsWhite.filter(function (pieceId) {
          return _this.board.piecePositions[pieceId].active;
        }).length;
        var moves = this.turn === "WHITE" ? movesWhite : movesBlack;
        var captures = this.turn === "WHITE" ? capturesWhite : capturesBlack;
        var noMoves =
          movesWhite + capturesWhite + movesBlack + capturesBlack === 0;
        var checked =
          !!this.board[this.turn === "WHITE" ? "checksBlack" : "checksWhite"]
            .length;
        var onlyKings = activeBlack === 1 && activeWhite === 1;
        var stalemate =
          onlyKings || noMoves || (moves + captures === 0 && !checked);
        var code = this.board.toShortCode();
        return {
          turn: this.turn,
          checked: checked,
          moves: moves,
          captures: captures,
          code: code,
          stalemate: stalemate,
        };
      };
      Game.prototype.randomMove = function () {
        var _this = this;
        if (this.active) {
          if (this.activePieceOptions.length) {
            var _a =
                this.activePieceOptions[
                  Math.floor(Math.random() * this.activePieceOptions.length)
                ],
              col = _a.col,
              row = _a.row;
            return { col: col, row: row };
          } else {
            var _b = this.board.piecePositions[this.active.data.id],
              col = _b.col,
              row = _b.row;
            return { col: col, row: row };
          }
        } else {
          var ids =
            this.turn === "WHITE"
              ? this.board.pieceIdsWhite
              : this.board.pieceIdsBlack;
          var positions = ids
            .map(function (pieceId) {
              var moves = _this.board.piecesTilesMoves[pieceId];
              var captures = _this.board.piecesTilesCaptures[pieceId];
              return moves.length || captures.length
                ? _this.board.piecePositions[pieceId]
                : undefined;
            })
            .filter(function (position) {
              return position === null || position === void 0
                ? void 0
                : position.active;
            });
          var remaining =
            positions[Math.floor(Math.random() * positions.length)];
          var _c = remaining || { col: "E", row: "1" },
            col = _c.col,
            row = _c.row;
          return { col: col, row: row };
        }
      };
      return Game;
    })();
    var View = /** @class */ (function () {
      function View(element, game, perspective) {
        this.element = element;
        this.game = game;
        this.setPerspective(perspective || this.game.turn);
        this.tiles = Utils.getInitialBoardTiles(
          this.element,
          this.handleTileClick.bind(this)
        );
        this.pieces = Utils.getInitialBoardPieces(
          this.element,
          this.game.board.pieces
        );
        this.drawPiecePositions();
      }
      View.prototype.drawActivePiece = function (activePieceId) {
        var _a = this.game.board.piecePositions[activePieceId],
          row = _a.row,
          col = _a.col;
        this.tiles[row][col].classList.add("highlight-active");
        this.pieces[activePieceId].classList.add("highlight-active");
      };
      View.prototype.drawCapturedPiece = function (capturedPieceId) {
        var piece = this.pieces[capturedPieceId];
        piece.style.setProperty(
          "--transition-delay",
          "var(--transition-duration)"
        );
        piece.style.removeProperty("--pos-col");
        piece.style.removeProperty("--pos-row");
        piece.style.setProperty("--scale", "0");
      };
      View.prototype.drawPiecePositions = function (moves, moveInner) {
        var _this = this;
        if (moves === void 0) {
          moves = [];
        }
        if (moveInner === void 0) {
          moveInner = "";
        }
        document.body.style.setProperty(
          "--chess-color-background",
          "var(--chess-color-" + this.game.turn.toLowerCase()
        );
        var other = this.game.turn === "WHITE" ? "turn-black" : "turn-white";
        var current = this.game.turn === "WHITE" ? "turn-white" : "turn-black";
        this.element.classList.add(current);
        this.element.classList.remove(other);
        if (moves.length) {
          this.element.classList.add("touching");
        } else {
          this.element.classList.remove("touching");
        }
        var key = function (row, col) {
          return row + "-" + col;
        };
        var moveKeys = moves.map(function (_a) {
          var row = _a.row,
            col = _a.col;
          return key(row, col);
        });
        this.game.board.tileEach(function (
          _a,
          piece,
          pieceMoves,
          pieceCaptures
        ) {
          var row = _a.row,
            col = _a.col;
          var tileElement = _this.tiles[row][col];
          var move = moveKeys.includes(key(row, col)) ? moveInner : "";
          var format = function (id, className) {
            return _this.game.board.pieces[id].shape();
          };
          tileElement.innerHTML =
            '\n        <div class="move">' +
            move +
            '</div>\n        <div class="moves">\n          ' +
            _this.game.board.tilesPiecesBlackMoves[row][col]
              .map(function (id) {
                return format(id, "black");
              })
              .join("") +
            "\n          " +
            _this.game.board.tilesPiecesWhiteMoves[row][col]
              .map(function (id) {
                return format(id, "white");
              })
              .join("") +
            '\n        </div>\n        <div class="captures">\n          ' +
            _this.game.board.tilesPiecesBlackCaptures[row][col]
              .map(function (id) {
                return format(id, "black");
              })
              .join("") +
            "\n          " +
            _this.game.board.tilesPiecesWhiteCaptures[row][col]
              .map(function (id) {
                return format(id, "white");
              })
              .join("") +
            "\n        </div>\n      ";
          if (piece) {
            tileElement.classList.add("occupied");
            var pieceElement = _this.pieces[piece.data.id];
            pieceElement.style.setProperty(
              "--pos-col",
              Utils.colToInt(col).toString()
            );
            pieceElement.style.setProperty(
              "--pos-row",
              Utils.rowToInt(row).toString()
            );
            pieceElement.style.setProperty("--scale", "1");
            pieceElement.classList[
              (
                pieceMoves === null || pieceMoves === void 0
                  ? void 0
                  : pieceMoves.length
              )
                ? "add"
                : "remove"
            ]("can-move");
            pieceElement.classList[
              (
                pieceCaptures === null || pieceCaptures === void 0
                  ? void 0
                  : pieceCaptures.length
              )
                ? "add"
                : "remove"
            ]("can-capture");
            if (piece.updateShape) {
              piece.updateShape = false;
              pieceElement.innerHTML = piece.shape();
            }
          } else {
            tileElement.classList.remove("occupied");
          }
        });
      };
      View.prototype.drawPositions = function (moves, captures) {
        var _this = this;
        moves === null || moves === void 0
          ? void 0
          : moves.forEach(function (_a) {
              var _b, _c;
              var row = _a.row,
                col = _a.col;
              _this.tiles[row][col].classList.add("highlight-move");
              (_c =
                _this.pieces[
                  (_b = _this.game.board.tileFind({ row: row, col: col })) ===
                    null || _b === void 0
                    ? void 0
                    : _b.data.id
                ]) === null || _c === void 0
                ? void 0
                : _c.classList.add("highlight-move");
            });
        captures === null || captures === void 0
          ? void 0
          : captures.forEach(function (_a) {
              var _b, _c;
              var row = _a.row,
                col = _a.col,
                capture = _a.capture;
              if (capture) {
                row = capture.row;
                col = capture.col;
              }
              _this.tiles[row][col].classList.add("highlight-capture");
              (_c =
                _this.pieces[
                  (_b = _this.game.board.tileFind({ row: row, col: col })) ===
                    null || _b === void 0
                    ? void 0
                    : _b.data.id
                ]) === null || _c === void 0
                ? void 0
                : _c.classList.add("highlight-capture");
            });
      };
      View.prototype.drawResetClassNames = function () {
        document
          .querySelectorAll(".highlight-active")
          .forEach(function (element) {
            return element.classList.remove("highlight-active");
          });
        document
          .querySelectorAll(".highlight-capture")
          .forEach(function (element) {
            return element.classList.remove("highlight-capture");
          });
        document
          .querySelectorAll(".highlight-move")
          .forEach(function (element) {
            return element.classList.remove("highlight-move");
          });
      };
      View.prototype.handleTileClick = function (location) {
        var _a = this.game.activate(location),
          activePieceId = _a.activePieceId,
          capturedPieceId = _a.capturedPieceId,
          _b = _a.moves,
          moves = _b === void 0 ? [] : _b,
          _c = _a.captures,
          captures = _c === void 0 ? [] : _c,
          type = _a.type;
        this.drawResetClassNames();
        if (type === "TOUCH") {
          var enPassant = captures.find(function (capture) {
            return !!capture.capture;
          });
          var passingMoves = enPassant ? moves.concat([enPassant]) : moves;
          this.drawPiecePositions(
            passingMoves,
            this.game.board.pieces[activePieceId].shape()
          );
        } else {
          this.drawPiecePositions();
        }
        if (type === "CANCEL" || type === "INVALID") {
          return;
        }
        if (type === "MOVE" || type === "CAPTURE") {
        } else {
          this.drawActivePiece(activePieceId);
        }
        if (type === "TOUCH") {
          this.drawPositions(moves, captures);
        } else if (type === "CAPTURE") {
          this.drawCapturedPiece(capturedPieceId);
        }
        // crazy town
        // this.setPerspective(this.game.turn);
      };
      View.prototype.setPerspective = function (perspective) {
        var other =
          perspective === "WHITE" ? "perspective-black" : "perspective-white";
        var current =
          perspective === "WHITE" ? "perspective-white" : "perspective-black";
        this.element.classList.add(current);
        this.element.classList.remove(other);
      };
      return View;
    })();
    var Control = /** @class */ (function () {
      function Control(game, view) {
        this.inputSpeedAsap = document.getElementById("speed-asap");
        this.inputSpeedFast = document.getElementById("speed-fast");
        this.inputSpeedMedium = document.getElementById("speed-medium");
        this.inputSpeedSlow = document.getElementById("speed-slow");
        this.inputRandomBlack = document.getElementById("black-random");
        this.inputRandomWhite = document.getElementById("white-random");
        this.inputPerspectiveBlack =
          document.getElementById("black-perspective");
        this.inputPerspectiveWhite =
          document.getElementById("white-perspective");
        this.game = game;
        this.view = view;
        this.inputPerspectiveBlack.addEventListener(
          "change",
          this.updateViewPerspective.bind(this)
        );
        this.inputPerspectiveWhite.addEventListener(
          "change",
          this.updateViewPerspective.bind(this)
        );
        this.updateViewPerspective();
      }
      Object.defineProperty(Control.prototype, "speed", {
        get: function () {
          if (this.inputSpeedAsap.checked) {
            return 50;
          }
          if (this.inputSpeedFast.checked) {
            return 250;
          }
          if (this.inputSpeedMedium.checked) {
            return 500;
          }
          if (this.inputSpeedSlow.checked) {
            return 1000;
          }
          return 0;
        },
        enumerable: false,
        configurable: true,
      });
      Control.prototype.autoplay = function () {
        var input =
          this.game.turn === "WHITE"
            ? this.inputRandomWhite
            : this.inputRandomBlack;
        if (!input.checked) {
          setTimeout(this.autoplay.bind(this), this.speed);
          return;
        }
        var position = this.game.randomMove();
        this.view.handleTileClick(position);
        setTimeout(this.autoplay.bind(this), this.speed);
      };
      Control.prototype.updateViewPerspective = function () {
        this.view.setPerspective(
          this.inputPerspectiveBlack.checked ? "BLACK" : "WHITE"
        );
      };
      return Control;
    })();
    var DEMOS = {
      castle1: "XD8B3,B1X,C1X,D1X,F1X,G1X",
      castle2: "XD8B3,B1X,C1X,C2X,D1X,F1X,G1X",
      castle3: "XD8E3,B1X,C1X,F2X,D1X,F1X,G1X",
      promote1: "E1,E8,C2C7",
      promote2: "E1,E8E7,PC2C8",
      start: "XE7E6,F7F5,D2D4,E2E5",
      test2: "C8E2,E8,G8H1,D7E4,H7H3,PA2H7,PB2G7,D2D6,E2E39,A1H2,E1B3",
      test: "C8E2,E8,G8H1,D7E4,H7H3,D1H7,PB2G7,D2D6,E2E39,A1H2,E1B3",
    };
    var initialPositions = Utils.getInitialPiecePositions();
    // const initialPositions = Utils.getPositionsFromShortCode(DEMOS.castle1);
    var initialTurn = "WHITE";
    var perspective = "WHITE";
    var game = new Game(
      Utils.getInitialPieces(),
      initialPositions,
      initialTurn
    );
    var view = new View(document.getElementById("board"), game, perspective);
    var control = new Control(game, view);
    control.autoplay();
  }
  render() {
    return (
      <div id="chess-app">
        <section id="view">
          <aside>
            <div>
              <h3 title="Autoplay">Auto</h3>
              <label htmlFor="white-random">
                <input type="checkbox" id="white-random" />
                <svg
                  width="170"
                  height="170"
                  viewBox="0 0 170 170"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="white"
                >
                  <use href="#king" />
                </svg>
              </label>
              <label htmlFor="black-random">
                <input type="checkbox" id="black-random" checked />
                <svg
                  width="170"
                  height="170"
                  viewBox="0 0 170 170"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="black"
                >
                  <use href="#king" />
                </svg>
              </label>
            </div>
            <div>
              <h3 title="Actions per Second">APS</h3>
              <label htmlFor="speed-slow">
                <input type="radio" name="speed" id="speed-slow" />
                <span>1</span>
              </label>
              <label htmlFor="speed-medium">
                <input type="radio" name="speed" id="speed-medium" checked />
                <span>2</span>
              </label>
              <label htmlFor="speed-fast">
                <input type="radio" name="speed" id="speed-fast" />
                <span>4</span>
              </label>
              <label htmlFor="speed-asap">
                <input type="radio" name="speed" id="speed-asap" />
                <span>20</span>
              </label>
            </div>
            <div>
              <h3 title="Point of View">POV</h3>
              <label htmlFor="white-perspective">
                <input
                  type="radio"
                  name="perspective"
                  id="white-perspective"
                  checked
                />
                <svg
                  width="170"
                  height="170"
                  viewBox="0 0 170 170"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="white"
                >
                  <use href="#king" />
                </svg>
              </label>
              <label htmlFor="black-perspective">
                <input type="radio" name="perspective" id="black-perspective" />
                <svg
                  width="170"
                  height="170"
                  viewBox="0 0 170 170"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="black"
                >
                  <use href="#king" />
                </svg>
              </label>
            </div>
          </aside>
          <div id="board"></div>
        </section>

        <svg
          aria-hidden
          style={{ display: "none" }}
          width="170"
          height="170"
          viewBox="0 0 170 170"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="pawn">
            <path
              fill="var(--stroke)"
              d="M63.9596 75.8417L71.9157 80.049C73.2376 77.5492 73.3078 74.5734 72.1052 72.0141C70.9025 69.4547 68.5669 67.6094 65.7987 67.0316L63.9596 75.8417ZM53.8303 94.9961L61.7863 99.2034L61.7864 99.2034L53.8303 94.9961ZM53.2512 96.2739L44.7646 93.2777L44.7646 93.2777L53.2512 96.2739ZM54.1798 112V121C57.4071 121 60.3874 119.272 61.9907 116.471C63.5939 113.67 63.5747 110.225 61.9403 107.442L54.1798 112ZM114.82 112L107.06 107.442C105.425 110.225 105.406 113.67 107.009 116.471C108.613 119.272 111.593 121 114.82 121V112ZM115.749 96.2739L124.235 93.2776L124.235 93.2776L115.749 96.2739ZM115.17 94.9961L107.214 99.2034L107.214 99.2034L115.17 94.9961ZM105.111 75.9755L104.388 67.0046C101.37 67.2479 98.6777 68.9917 97.2213 71.6453C95.7649 74.2989 95.74 77.5069 97.1551 80.1828L105.111 75.9755ZM101.706 61L94.1937 56.0436C92.3701 58.8076 92.2116 62.3498 93.7811 65.2657C95.3506 68.1816 98.3945 70 101.706 70V61ZM68.294 61V70C71.6055 70 74.6494 68.1816 76.2189 65.2657C77.7884 62.3498 77.6299 58.8076 75.8063 56.0436L68.294 61ZM56.0036 71.6343L45.8743 90.7887L61.7864 99.2034L71.9157 80.049L56.0036 71.6343ZM45.8743 90.7887C45.5683 91.3674 45.1338 92.2321 44.7646 93.2777L61.7378 99.2702C61.7062 99.3598 61.685 99.4043 61.691 99.3911C61.6938 99.3851 61.7021 99.3674 61.718 99.3356C61.7341 99.3035 61.756 99.2608 61.7863 99.2034L45.8743 90.7887ZM44.7646 93.2777C43.8488 95.8717 40.5174 106.509 46.4192 116.558L61.9403 107.442C61.2075 106.194 60.9315 104.686 61.0138 103C61.0971 101.296 61.5308 99.8565 61.7378 99.2702L44.7646 93.2777ZM54.1798 103H54V121H54.1798V103ZM54 103C41.2975 103 31 113.297 31 126H49C49 123.239 51.2386 121 54 121V103ZM31 126C31 138.703 41.2974 149 54 149V131C51.2386 131 49 128.761 49 126H31ZM54 149H116V131H54V149ZM116 149C128.703 149 139 138.703 139 126H121C121 128.761 118.761 131 116 131V149ZM139 126C139 113.297 128.703 103 116 103V121C118.761 121 121 123.239 121 126H139ZM116 103H114.82V121H116V103ZM122.581 116.558C128.483 106.509 125.151 95.8716 124.235 93.2776L107.262 99.2702C107.469 99.8565 107.903 101.296 107.986 103C108.069 104.686 107.793 106.194 107.06 107.442L122.581 116.558ZM124.235 93.2776C123.866 92.2321 123.432 91.3674 123.126 90.7887L107.214 99.2034C107.244 99.2608 107.266 99.3035 107.282 99.3356C107.298 99.3674 107.306 99.3851 107.309 99.3912C107.315 99.4043 107.294 99.3598 107.262 99.2702L124.235 93.2776ZM123.126 90.7888L113.067 71.7681L97.1551 80.1828L107.214 99.2034L123.126 90.7888ZM103 68.5C103 67.7083 103.607 67.0675 104.388 67.0046L105.835 84.9463C114.328 84.2614 121 77.1644 121 68.5H103ZM104.5 70C103.672 70 103 69.3284 103 68.5H121C121 59.3873 113.613 52 104.5 52V70ZM101.706 70H104.5V52H101.706V70ZM109.218 65.9564C112.241 61.375 114 55.8793 114 50H96C96 52.248 95.3352 54.3134 94.1937 56.0436L109.218 65.9564ZM114 50C114 33.9837 101.016 21 85 21V39C91.0751 39 96 43.9249 96 50H114ZM85 21C68.9837 21 56 33.9837 56 50H74C74 43.9249 78.9249 39 85 39V21ZM56 50C56 55.8793 57.7591 61.375 60.7818 65.9564L75.8063 56.0436C74.6648 54.3134 74 52.248 74 50H56ZM65.5 70H68.294V52H65.5V70ZM67 68.5C67 69.3284 66.3284 70 65.5 70V52C56.3873 52 49 59.3873 49 68.5H67ZM65.7987 67.0316C66.4826 67.1743 67 67.7665 67 68.5H49C49 76.4618 54.6302 83.0882 62.1205 84.6518L65.7987 67.0316Z"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M63.9596 75.8417L53.8303 94.9961C53.6109 95.4111 53.4075 95.8312 53.2512 96.2739C52.4848 98.4448 50.4371 105.627 54.1798 112H54C46.268 112 40 118.268 40 126C40 133.732 46.268 140 54 140H116C123.732 140 130 133.732 130 126C130 118.268 123.732 112 116 112H114.82C118.563 105.627 116.515 98.4447 115.749 96.2739C115.592 95.8312 115.389 95.4111 115.17 94.9961L105.111 75.9755C108.967 75.6645 112 72.4364 112 68.5C112 64.3579 108.642 61 104.5 61H101.706C103.788 57.8442 105 54.0636 105 50C105 38.9543 96.0457 30 85 30C73.9543 30 65 38.9543 65 50C65 54.0636 66.2119 57.8442 68.294 61H65.5C61.3579 61 58 64.3579 58 68.5C58 72.1142 60.5564 75.1312 63.9596 75.8417Z"
            />
          </g>

          <g id="rook">
            <path
              fill="var(--stroke)"
              d="M96 40H105C105 35.0294 100.971 31 96 31V40ZM75 40V31C70.0294 31 66 35.0294 66 40H75ZM75 53L75 62C77.3869 62 79.6761 61.0518 81.364 59.364C83.0518 57.6761 84 55.387 84 53H75ZM58 53H49C49 57.9706 53.0294 62 58 62L58 53ZM58 40H67C67 35.0294 62.9706 31 58 31V40ZM39 40V31C34.0294 31 30 35.0294 30 40H39ZM39 69H30C30 69.379 30.0239 69.7577 30.0717 70.1337L39 69ZM46.8667 130.951L51.4589 138.691C54.5432 136.861 56.2467 133.375 55.795 129.817L46.8667 130.951ZM123.133 130.951L114.205 129.817C113.753 133.375 115.457 136.861 118.541 138.691L123.133 130.951ZM131 69L139.928 70.1338C139.976 69.7577 140 69.3791 140 69L131 69ZM131 40H140C140 35.0294 135.971 31 131 31V40ZM113 40V31C108.029 31 104 35.0294 104 40H113ZM113 53L113 62C115.387 62 117.676 61.0518 119.364 59.364C121.052 57.6761 122 55.387 122 53H113ZM96 53H87C87 57.9706 91.0294 62 96 62L96 53ZM96 31H75V49H96V31ZM66 40V53H84V40H66ZM75 44L58 44L58 62L75 62L75 44ZM67 53V40H49V53H67ZM58 31H39V49H58V31ZM30 40V69H48V40H30ZM30.0717 70.1337L37.9384 132.085L55.795 129.817L47.9283 67.8663L30.0717 70.1337ZM42.2745 123.211C35.5441 127.204 30.9998 134.566 30.9998 143H48.9998C48.9998 141.18 49.9671 139.576 51.4589 138.691L42.2745 123.211ZM30.9998 143C30.9998 155.703 41.2973 166 53.9998 166V148C51.2384 148 48.9998 145.761 48.9998 143H30.9998ZM53.9998 166H116V148H53.9998V166ZM116 166C128.702 166 139 155.703 139 143H121C121 145.761 118.761 148 116 148V166ZM139 143C139 134.567 134.456 127.204 127.725 123.211L118.541 138.691C120.033 139.576 121 141.18 121 143H139ZM132.061 132.085L139.928 70.1338L122.072 67.8662L114.205 129.817L132.061 132.085ZM140 69V40H122V69H140ZM131 31H113V49H131V31ZM104 40V53H122V40H104ZM113 44L96 44L96 62L113 62L113 44ZM105 53V40H87V53H105Z"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M96 40H75V53L58 53V40H39V69L46.8667 130.951C42.7556 133.39 39.9998 137.873 39.9998 143C39.9998 150.732 46.2678 157 53.9998 157H116C123.732 157 130 150.732 130 143C130 137.873 127.244 133.39 123.133 130.951L131 69V40H113V53L96 53V40Z"
            />
          </g>

          <g id="knight">
            <path
              fill="var(--stroke)"
              d="M49.1052 38.3193L55.4587 44.6937L55.4587 44.6937L49.1052 38.3193ZM94.2401 29.9368L87.874 36.2986L87.8741 36.2987L94.2401 29.9368ZM47.3161 124.557L55.6423 121.14L55.6423 121.14L47.3161 124.557ZM51.766 130.503L55.8329 138.532C58.5612 137.15 60.401 134.477 60.7176 131.435C61.0343 128.393 59.7845 125.399 57.3994 123.484L51.766 130.503ZM127.628 131.204L122.091 124.109C119.79 125.905 118.502 128.705 118.637 131.621C118.773 134.537 120.314 137.207 122.772 138.782L127.628 131.204ZM132.387 123.702L141.165 125.687L141.165 125.687L132.387 123.702ZM127.584 110.339L133.091 103.22L133.091 103.22L127.584 110.339ZM110.576 97.1821L105.069 104.301L105.069 104.301L110.576 97.1821ZM126.76 52.2539L121.858 59.802L121.858 59.802L126.76 52.2539ZM99.5001 34.552L104.402 27.0039L104.402 27.0039L99.5001 34.552ZM94.4956 30.1927L100.866 23.8348L100.866 23.8347L94.4956 30.1927ZM55.4587 44.6937C66.4763 33.7121 74.1214 31.8771 78.4041 32.0063C82.8219 32.1396 86.0037 34.427 87.874 36.2986L100.606 23.575C96.9524 19.9187 89.6658 14.3378 78.9468 14.0145C68.0925 13.6871 55.9323 18.8073 42.7516 31.9449L55.4587 44.6937ZM55.6423 121.14C51.8581 111.919 46.772 97.1895 45.3694 82.2455C43.9517 67.1402 46.4349 53.688 55.4587 44.6937L42.7516 31.9449C28.1598 46.4892 25.8204 66.5842 27.4482 83.9274C29.091 101.432 34.9182 118.052 38.99 127.974L55.6423 121.14ZM57.3994 123.484C56.6293 122.866 56.029 122.082 55.6423 121.14L38.99 127.974C40.5712 131.827 43.0657 135.061 46.1326 137.522L57.3994 123.484ZM53.0838 143C53.0838 141.063 54.183 139.368 55.8329 138.532L47.699 122.475C40.2331 126.256 35.0838 134.019 35.0838 143H53.0838ZM58.0838 148C55.3224 148 53.0838 145.761 53.0838 143H35.0838C35.0838 155.703 45.3812 166 58.0838 166V148ZM120.084 148H58.0838V166H120.084V148ZM125.084 143C125.084 145.761 122.845 148 120.084 148V166C132.786 166 143.084 155.703 143.084 143H125.084ZM122.772 138.782C124.181 139.685 125.084 141.24 125.084 143H143.084C143.084 134.852 138.84 127.7 132.484 123.627L122.772 138.782ZM123.608 121.717C123.387 122.695 122.843 123.522 122.091 124.109L133.165 138.3C137.095 135.233 140 130.837 141.165 125.687L123.608 121.717ZM122.077 117.458C123.372 118.459 123.969 120.121 123.608 121.717L141.165 125.687C143.069 117.265 139.92 108.503 133.091 103.22L122.077 117.458ZM105.069 104.301L122.077 117.458L133.091 103.22L116.083 90.0634L105.069 104.301ZM98.3876 90.6851C98.3876 96.0131 100.855 101.041 105.069 104.301L116.083 90.0634C116.275 90.2123 116.388 90.4418 116.388 90.6851H98.3876ZM115.602 73.471C106.095 73.471 98.3876 81.178 98.3876 90.6851H116.388C116.388 91.1191 116.036 91.471 115.602 91.471V73.471ZM120.815 73.471H115.602V91.471H120.815V73.471ZM125.243 69.0432C125.243 71.4886 123.261 73.471 120.815 73.471V91.471C133.202 91.471 143.243 81.4297 143.243 69.0432H125.243ZM125.243 66.0369V69.0432H143.243V66.0369H125.243ZM121.858 59.802C123.969 61.1731 125.243 63.5195 125.243 66.0369H143.243C143.243 57.4241 138.885 49.3965 131.661 44.7058L121.858 59.802ZM94.5985 42.1001L121.858 59.802L131.661 44.7058L104.402 27.0039L94.5985 42.1001ZM88.1255 36.5506C89.5726 38.0004 91.8096 40.2891 94.5985 42.1001L104.402 27.0039C103.476 26.4028 102.551 25.5233 100.866 23.8348L88.1255 36.5506ZM87.8741 36.2987C87.9569 36.3816 88.04 36.4649 88.1256 36.5506L100.866 23.8347C100.781 23.7498 100.694 23.6625 100.606 23.5749L87.8741 36.2987Z"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M94.2401 29.9368C88.716 24.409 73.3034 14.2001 49.1052 38.3193C25.4895 61.8579 39.4602 105.414 47.3161 124.557C48.3001 126.955 49.8475 128.963 51.766 130.503C47.208 132.812 44.0838 137.541 44.0838 143C44.0838 150.732 50.3518 157 58.0838 157H120.084C127.816 157 134.084 150.732 134.084 143C134.084 138.046 131.511 133.693 127.628 131.204C129.969 129.378 131.694 126.766 132.387 123.702C133.519 118.693 131.646 113.481 127.584 110.339L110.576 97.1821C108.565 95.6265 107.388 93.2275 107.388 90.6851C107.388 86.1486 111.065 82.471 115.602 82.471H120.815C128.231 82.471 134.243 76.4592 134.243 69.0432V66.0369C134.243 60.4718 131.427 55.2848 126.76 52.2539L99.5001 34.552C97.6428 33.3459 96.0618 31.7619 94.4956 30.1927C94.4104 30.1073 94.3252 30.022 94.2401 29.9368Z"
            />
          </g>

          <g id="bishop">
            <path
              fill="var(--stroke)"
              d="M97.7142 44.0856L89.4897 40.4306L87.1055 45.7955L91.0547 50.1396L97.7142 44.0856ZM107.204 54.5248L113.843 60.6014L119.386 54.5454L113.864 48.4708L107.204 54.5248ZM90.0638 73.2519L96.7027 79.3284L96.7027 79.3284L90.0638 73.2519ZM90.5325 83.8481L84.4559 90.4871L84.4559 90.4871L90.5325 83.8481ZM101.129 83.3795L107.768 89.456L107.768 89.456L101.129 83.3795ZM117.337 65.6709L123.997 59.6168L117.36 52.3162L110.698 59.5943L117.337 65.6709ZM122.204 71.0243L115.544 77.0783L115.544 77.0783L122.204 71.0243ZM126.158 88.1953L134.795 90.7267L134.795 90.7267L126.158 88.1953ZM115.792 123.563L107.155 121.031L107.155 121.031L115.792 123.563ZM113.283 128.798L105.902 123.648L96.0296 137.798H113.283V128.798ZM54.7167 128.798V137.798H71.9704L62.0977 123.648L54.7167 128.798ZM52.2081 123.563L60.8447 121.031L60.8447 121.031L52.2081 123.563ZM41.8417 88.1953L33.2051 90.7267L33.2051 90.7267L41.8417 88.1953ZM45.7961 71.0243L52.4556 77.0783L52.4556 77.0783L45.7961 71.0243ZM70.2858 44.0856L76.9453 50.1396L80.8945 45.7955L78.5103 40.4306L70.2858 44.0856ZM105.939 47.7406C107.267 44.7523 108 41.4498 108 38H90C90 38.8832 89.8148 39.6991 89.4897 40.4306L105.939 47.7406ZM113.864 48.4708L104.374 38.0315L91.0547 50.1396L100.545 60.5789L113.864 48.4708ZM96.7027 79.3284L113.843 60.6014L100.565 48.4483L83.4248 67.1754L96.7027 79.3284ZM96.609 77.2092C97.2201 77.7685 97.2621 78.7173 96.7027 79.3284L83.4248 67.1754C77.2722 73.8975 77.7338 84.3345 84.4559 90.4871L96.609 77.2092ZM94.4898 77.3029C95.0491 76.6918 95.9979 76.6499 96.609 77.2092L84.4559 90.4871C91.178 96.6397 101.615 96.1781 107.768 89.456L94.4898 77.3029ZM110.698 59.5943L94.4898 77.3029L107.768 89.456L123.976 71.7474L110.698 59.5943ZM128.863 64.9702L123.997 59.6168L110.678 71.7249L115.544 77.0783L128.863 64.9702ZM134.795 90.7267C137.442 81.6942 135.195 71.9349 128.863 64.9702L115.544 77.0783C117.655 79.3999 118.404 82.653 117.522 85.6638L134.795 90.7267ZM124.429 126.094L134.795 90.7267L117.522 85.6638L107.155 121.031L124.429 126.094ZM120.664 133.948C122.307 131.594 123.591 128.951 124.429 126.094L107.155 121.031C106.874 121.992 106.446 122.869 105.902 123.648L120.664 133.948ZM116 119.798H113.283V137.798H116V119.798ZM139 142.798C139 130.096 128.703 119.798 116 119.798V137.798C118.761 137.798 121 140.037 121 142.798H139ZM116 165.798C128.703 165.798 139 155.501 139 142.798H121C121 145.56 118.761 147.798 116 147.798V165.798ZM54 165.798H116V147.798H54V165.798ZM31 142.798C31 155.501 41.2974 165.798 54 165.798V147.798C51.2386 147.798 49 145.56 49 142.798H31ZM54 119.798C41.2975 119.798 31 130.096 31 142.798H49C49 140.037 51.2386 137.798 54 137.798V119.798ZM54.7167 119.798H54V137.798H54.7167V119.798ZM43.5714 126.094C44.4088 128.951 45.6929 131.594 47.3357 133.948L62.0977 123.648C61.5539 122.869 61.1262 121.992 60.8447 121.031L43.5714 126.094ZM33.2051 90.7267L43.5714 126.094L60.8447 121.031L50.4784 85.6638L33.2051 90.7267ZM39.1366 64.9702C32.8051 71.9349 30.5576 81.6942 33.2051 90.7267L50.4784 85.6638C49.5959 82.653 50.3451 79.3999 52.4556 77.0783L39.1366 64.9702ZM63.6264 38.0315L39.1366 64.9702L52.4556 77.0783L76.9453 50.1396L63.6264 38.0315ZM60 38C60 41.4498 60.7334 44.7523 62.0614 47.7406L78.5103 40.4306C78.1852 39.6991 78 38.8832 78 38H60ZM84 14C70.7452 14 60 24.7452 60 38H78C78 34.6863 80.6863 32 84 32V14ZM108 38C108 24.7452 97.2548 14 84 14V32C87.3137 32 90 34.6863 90 38H108Z"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M99 38C99 40.1665 98.5407 42.2257 97.7142 44.0856L107.204 54.5248L90.0638 73.2519C87.2671 76.3074 87.477 81.0515 90.5325 83.8481C93.588 86.6448 98.3321 86.435 101.129 83.3795L117.337 65.6709L122.204 71.0243C126.425 75.6674 127.923 82.1736 126.158 88.1953L115.792 123.563C115.233 125.471 114.377 127.231 113.283 128.798H116C123.732 128.798 130 135.066 130 142.798C130 150.53 123.732 156.798 116 156.798H54C46.268 156.798 40 150.53 40 142.798C40 135.066 46.268 128.798 54 128.798H54.7167C53.6234 127.231 52.7675 125.471 52.2081 123.563L41.8417 88.1953C40.0767 82.1736 41.5751 75.6674 45.7961 71.0243L70.2858 44.0856C69.4593 42.2257 69 40.1665 69 38C69 29.7157 75.7157 23 84 23C92.2843 23 99 29.7157 99 38Z"
            />
          </g>

          <g id="queen">
            <path
              fill="var(--stroke)"
              d="M98.3201 39.3222L89.7589 36.5462C88.2688 41.1416 90.6725 46.0937 95.2048 47.7659L98.3201 39.3222ZM71.6799 39.3222L74.7952 47.7659C79.3275 46.0937 81.7312 41.1416 80.2411 36.5462L71.6799 39.3222ZM54.2398 58V67C58.658 67 62.4228 63.7931 63.1253 59.4312L54.2398 58ZM23.8059 83.7931L32.42 81.1862L32.42 81.1862L23.8059 83.7931ZM34.7006 119.793L26.0864 122.4L26.0864 122.4L34.7006 119.793ZM45.4311 132.146L51.1198 139.12C53.5226 137.16 54.7472 134.101 54.3609 131.025C53.9746 127.948 52.0318 125.287 49.2191 123.982L45.4311 132.146ZM124.913 131.982L120.97 123.892C118.183 125.25 116.292 127.947 115.963 131.029C115.635 134.112 116.917 137.147 119.355 139.061L124.913 131.982ZM135.299 119.793L126.685 117.186L126.685 117.186L135.299 119.793ZM146.194 83.7932L137.58 81.1862L137.58 81.1862L146.194 83.7932ZM115.76 58L106.875 59.4312C107.577 63.7931 111.342 67 115.76 67V58ZM90 35C90 35.5543 89.9131 36.0707 89.7589 36.5462L106.881 42.0983C107.61 39.8513 108 37.4624 108 35H90ZM85 30C87.7614 30 90 32.2386 90 35H108C108 22.2975 97.7026 12 85 12V30ZM80 35C80 32.2386 82.2386 30 85 30V12C72.2975 12 62 22.2975 62 35H80ZM80.2411 36.5462C80.0869 36.0707 80 35.5543 80 35H62C62 37.4624 62.3902 39.8513 63.1188 42.0983L80.2411 36.5462ZM63.1253 59.4312C63.7988 55.2498 67.5604 50.4352 74.7952 47.7659L68.5647 30.8786C57.1112 35.1044 47.3444 44.2138 45.3544 56.5688L63.1253 59.4312ZM54.2398 49H42.9485V67H54.2398V49ZM42.9485 49C23.4932 49 9.55633 67.7789 15.1917 86.4001L32.42 81.1862C30.2825 74.123 35.5689 67 42.9485 67V49ZM15.1917 86.4001L26.0864 122.4L43.3148 117.186L32.42 81.1862L15.1917 86.4001ZM26.0864 122.4C28.5395 130.506 34.3182 136.911 41.643 140.31L49.2191 123.982C46.429 122.687 44.2438 120.256 43.3148 117.186L26.0864 122.4ZM39.7423 125.172C34.5896 129.375 31.2741 135.804 31.2741 143H49.2741C49.2741 141.44 49.978 140.051 51.1198 139.12L39.7423 125.172ZM31.2741 143C31.2741 155.703 41.5715 166 54.2741 166V148C51.5127 148 49.2741 145.761 49.2741 143H31.2741ZM54.2741 166H116.274V148H54.2741V166ZM116.274 166C128.977 166 139.274 155.703 139.274 143H121.274C121.274 145.761 119.036 148 116.274 148V166ZM139.274 143C139.274 135.648 135.815 129.099 130.471 124.904L119.355 139.061C120.54 139.991 121.274 141.407 121.274 143H139.274ZM128.856 140.073C135.943 136.619 141.516 130.321 143.914 122.4L126.685 117.186C125.777 120.186 123.67 122.576 120.97 123.892L128.856 140.073ZM143.914 122.4L154.808 86.4001L137.58 81.1862L126.685 117.186L143.914 122.4ZM154.808 86.4001C160.444 67.7789 146.507 49 127.052 49V67C134.431 67 139.718 74.123 137.58 81.1862L154.808 86.4001ZM127.052 49H115.76V67H127.052V49ZM95.2048 47.7659C102.44 50.4352 106.201 55.2498 106.875 59.4312L124.646 56.5688C122.656 44.2138 112.889 35.1044 101.435 30.8786L95.2048 47.7659Z"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M98.3201 39.3222C98.7615 37.961 99 36.5084 99 35C99 27.268 92.732 21 85 21C77.268 21 71 27.268 71 35C71 36.5084 71.2385 37.961 71.6799 39.3222C62.3358 42.7698 55.5716 49.7318 54.2398 58H42.9485C29.5311 58 19.9194 70.951 23.8059 83.7931L34.7006 119.793C36.3917 125.381 40.3736 129.799 45.4311 132.146C42.2838 134.713 40.2741 138.622 40.2741 143C40.2741 150.732 46.5421 157 54.2741 157H116.274C124.006 157 130.274 150.732 130.274 143C130.274 138.528 128.177 134.545 124.913 131.982C129.807 129.597 133.647 125.254 135.299 119.793L146.194 83.7932C150.081 70.951 140.469 58 127.052 58H115.76C114.428 49.7318 107.664 42.7698 98.3201 39.3222Z"
            />
          </g>

          <g id="king">
            <path
              fill="var(--stroke)"
              d="M71.3981 29V38C74.4851 38 77.3566 36.4179 79.0059 33.8085C80.6552 31.1991 80.8521 27.9265 79.5275 25.1382L71.3981 29ZM55.5392 47V56C59.196 56 62.4893 53.7874 63.8715 50.4019C65.2537 47.0165 64.4501 43.1312 61.8383 40.5718L55.5392 47ZM16.8101 72.5915L25.4512 70.0754L25.4512 70.0754L16.8101 72.5915ZM30.4959 119.592L39.137 117.075L39.137 117.075L30.4959 119.592ZM44.3251 133.266L50.7933 139.524C52.9992 137.244 53.8418 133.971 53.011 130.909C52.1801 127.848 49.7986 125.449 46.7427 124.597L44.3251 133.266ZM126.438 133.253L123.999 124.59C120.947 125.449 118.572 127.851 117.747 130.913C116.923 133.974 117.77 137.244 119.978 139.52L126.438 133.253ZM140.22 119.592L148.861 122.108L148.861 122.108L140.22 119.592ZM153.906 72.5915L145.265 70.0753L145.265 70.0753L153.906 72.5915ZM115.236 47L108.937 40.5718C106.325 43.1312 105.522 47.0165 106.904 50.4019C108.286 53.7874 111.579 56 115.236 56V47ZM99.3773 29L91.2479 25.1382C89.9233 27.9265 90.1202 31.1991 91.7695 33.8085C93.4188 36.4179 96.2903 38 99.3773 38V29ZM79.3877 24.5C79.3877 23.6716 80.0593 23 80.8877 23V5C70.1181 5 61.3877 13.7304 61.3877 24.5H79.3877ZM79.5275 25.1382C79.4407 24.9555 79.3877 24.7465 79.3877 24.5H61.3877C61.3877 27.4743 62.0598 30.3168 63.2688 32.8618L79.5275 25.1382ZM71.3981 20H62.8877V38H71.3981V20ZM62.8877 20C52.1181 20 43.3877 28.7304 43.3877 39.5H61.3877C61.3877 38.6716 62.0593 38 62.8877 38V20ZM43.3877 39.5C43.3877 44.9545 45.639 49.8994 49.2401 53.4282L61.8383 40.5718C61.5498 40.2891 61.3877 39.9216 61.3877 39.5H43.3877ZM55.5392 38H36.0125V56H55.5392V38ZM36.0125 38C16.6845 38 2.7653 56.5505 8.16895 75.1077L25.4512 70.0754C23.4015 63.0364 28.6812 56 36.0125 56V38ZM8.16895 75.1077L21.8548 122.108L39.137 117.075L25.4512 70.0754L8.16895 75.1077ZM21.8548 122.108C24.7108 131.916 32.4229 139.291 41.9074 141.936L46.7427 124.597C43.1399 123.592 40.2185 120.789 39.137 117.075L21.8548 122.108ZM37.8569 127.008C33.861 131.139 31.3877 136.79 31.3877 143H49.3877C49.3877 141.646 49.9143 140.433 50.7933 139.524L37.8569 127.008ZM31.3877 143C31.3877 155.703 41.6852 166 54.3877 166V148C51.6263 148 49.3877 145.761 49.3877 143H31.3877ZM54.3877 166H116.388V148H54.3877V166ZM116.388 166C129.09 166 139.388 155.703 139.388 143H121.388C121.388 145.761 119.149 148 116.388 148V166ZM139.388 143C139.388 136.779 136.906 131.119 132.898 126.987L119.978 139.52C120.859 140.429 121.388 141.643 121.388 143H139.388ZM128.876 141.917C138.33 139.256 146.012 131.893 148.861 122.108L131.579 117.075C130.5 120.781 127.59 123.579 123.999 124.59L128.876 141.917ZM148.861 122.108L162.547 75.1077L145.265 70.0753L131.579 117.075L148.861 122.108ZM162.547 75.1077C167.951 56.5504 154.032 38 134.704 38V56C142.035 56 147.315 63.0364 145.265 70.0753L162.547 75.1077ZM134.704 38H115.236V56H134.704V38ZM121.535 53.4282C125.136 49.8994 127.388 44.9545 127.388 39.5H109.388C109.388 39.9216 109.226 40.2891 108.937 40.5718L121.535 53.4282ZM127.388 39.5C127.388 28.7304 118.657 20 107.888 20V38C108.716 38 109.388 38.6716 109.388 39.5H127.388ZM107.888 20H99.3773V38H107.888V20ZM91.3877 24.5C91.3877 24.7465 91.3347 24.9555 91.2479 25.1382L107.507 32.8618C108.716 30.3168 109.388 27.4743 109.388 24.5H91.3877ZM89.8877 23C90.7161 23 91.3877 23.6716 91.3877 24.5H109.388C109.388 13.7304 100.657 5 89.8877 5V23ZM80.8877 23H89.8877V5H80.8877V23Z"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M80.8877 14C75.0887 14 70.3877 18.701 70.3877 24.5C70.3877 26.1104 70.7502 27.6361 71.3981 29H62.8877C57.0887 29 52.3877 33.701 52.3877 39.5C52.3877 42.438 53.5944 45.0942 55.5392 47H36.0125C22.6829 47 13.0834 59.7934 16.8101 72.5915L30.4959 119.592C32.4647 126.353 37.7814 131.441 44.3251 133.266C41.8876 135.786 40.3877 139.218 40.3877 143C40.3877 150.732 46.6557 157 54.3877 157H116.388C124.12 157 130.388 150.732 130.388 143C130.388 139.211 128.883 135.774 126.438 133.253C132.96 131.417 138.256 126.337 140.22 119.592L153.906 72.5915C157.633 59.7934 148.033 47 134.704 47H115.236C117.181 45.0942 118.388 42.438 118.388 39.5C118.388 33.701 113.687 29 107.888 29H99.3773C100.025 27.6361 100.388 26.1104 100.388 24.5C100.388 18.701 95.6867 14 89.8877 14H80.8877Z"
            />
          </g>
        </svg>
      </div>
    );
  }
}
