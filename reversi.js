var config = {
	size : 10,
	white : 1,
	black : 2,
	cell_size : 30,
	stone_size : 10,
}


var board = {
	map : [],
	size : config.size,
	init : function() {
		for (var i=0; i < this.size; i+=1) {
			this.map[i] = [];
			for (var j=0; j < this.size; j+=1) {
				this.map[i][j] = 0;
			}
		}
		this.map[4][4] = 1;
		this.map[5][5] = 1;
		this.map[4][5] = 2;
		this.map[5][4] = 2;
	},
	put : function(x, y, color) {

		if (x > this.size || y > this.size) {
			console.log("put error:"+ x +"," + y +" is size over.");
			return false;
		}
		if (x < 0 || y < 0) {
			console.log("put error ["+ x +"," + y +"] is incorrect num.");
			return false;
		}
		if (this.map[x][y] === 0) {
			if (this.check(x, y, color)) {
				this.map[x][y] = color;
				this.reverse(x, y);
			} else {
				return false;
			}
		} else {
			console.log("put error ["+ x +"," + y +"] is setted "+ this.map[x][y]);
			return false;
		}
		return true;
	},
	
	check : function(x, y, color) {
		var unti_color,
			find_unti_color;

		// check map
		if (this.map[x][y] !== 0) {
			return false;
		}

		// define unti_color
		if (color === config.white) {
			unti_color = config.black;
		} else if (color === config.black) {
			unti_color = config.white;
		} else {
			console.log("check error ["+ x +"," + y +"] is "+ this.map[x][y]);
			return false;
		}
		
		// Right
		find_unti_color = false;
		for (var i = x + 1; i < this.size; i= i+1) {
			if (this.map[i][y] === unti_color) {
				find_unti_color = true;
			} else if (this.map[i][y] === color) {
				if (find_unti_color) {
					return true;
				}
				break;
			} else {
				break;
			}
		}

		// Left
		find_unti_color = false;
		for (var i = x - 1; i >= 0; i= i-1) {
			if (this.map[i][y] === unti_color) {
				find_unti_color = true;
			} else if (this.map[i][y] === color) {
				if (find_unti_color) {
					return true;
				}
				break;
			} else {
				break;
			}
		}
		// Down
		find_unti_color = false;
		for (var i = y + 1; i < this.size; i= i+1) {
			if (this.map[x][i] === unti_color) {
				find_unti_color = true;
			} else if (this.map[x][i] === color) {
				if (find_unti_color) {
					return true;
				}
				break;
			} else {
				break;
			}
		}

		// Up
		find_unti_color = false;
		for (var i = y - 1; i >= 0; i= i-1) {
			if (this.map[x][i] === unti_color) {
				find_unti_color = true;
			} else if (this.map[x][i] === color) {
				if (find_unti_color) {
					return true;
				}
				break;
			} else {
				break;
			}
		}

		//Right Down
		find_unti_color = false;
		for (var i = x + 1, j = y + 1; i < this.size && j < this.size; i= i+1, j = j+1) {
			if (this.map[i][j] === unti_color) {
				find_unti_color = true;
			} else if (this.map[i][j] === color) {
				if (find_unti_color) {
					return true;
				}
				break;
			} else {
				break;
			}
		}

		//Right Up
		find_unti_color = false;
		for (var i = x + 1, j = y - 1; i < this.size && j >= 0; i= i+1, j = j-1) {
			if (this.map[i][j] === unti_color) {
				find_unti_color = true;
			} else if (this.map[i][j] === color) {
				if (find_unti_color) {
						return true;
				}
				break;
			} else {
				break;
			}
		}

		//Left Down
		find_unti_color = false;
		for (var i = x - 1, j = y + 1; i >= 0 && j < this.size; i= i-1, j = j+1) {
			if (this.map[i][j] === unti_color) {
				find_unti_color = true;
			} else if (this.map[i][j] === color) {
				if (find_unti_color) {
					return true;
				}
				break;
			} else {
				break;
			}
		}

		//Left Up
		find_unti_color = false;
		for (var i = x - 1, j = y - 1; i >= 0 && j >= 0; i= i-1, j = j-1) {
			if (this.map[i][j] === unti_color) {
				find_unti_color = true;
			} else if (this.map[i][j] === color) {
				if (find_unti_color) {
						return true;
				}
				break;
			} else {
				break;
			}
		}

		console.log("can't put color " + color +" ["+ x + ", "+ y +"]");
		return false;
	},

	reverse : function(x, y) {
		var set_color = this.map[x][y],
			unti_color,
			find_unti_color;

		// define unti_color
		if (set_color === config.white) {
			unti_color = config.black;
		} else if (set_color === config.black) {
			unti_color = config.white;
		} else {
			console.log("check error ["+ x +"," + y +"] is "+ this.map[x][y]);
		}
		
		// Right
		find_unti_color = false;
		for (var i = x + 1; i < this.size; i= i+1) {
			if (this.map[i][y] === unti_color) {
				find_unti_color = true;
			} else if (this.map[i][y] === set_color) {
				if (find_unti_color) {
					while (i > x) {
						i -= 1;
						this.map[i][y] = set_color;
					}
				}
				break;
			} else {
				break;
			}
		}

		// Left
		find_unti_color = false;
		for (var i = x - 1; i >= 0; i= i-1) {
			if (this.map[i][y] === unti_color) {
				find_unti_color = true;
			} else if (this.map[i][y] === set_color) {
				if (find_unti_color) {
					while (i < x) {
						i += 1;
						this.map[i][y] = set_color;
					}
				}
				break;
			} else {
				break;
			}
		}
		
		// Down
		find_unti_color = false;
		for (var i = y + 1; i < this.size; i= i+1) {
			if (this.map[x][i] === unti_color) {
				find_unti_color = true;
			} else if (this.map[x][i] === set_color) {
				if (find_unti_color) {
					while (i > y) {
						i -= 1;
						this.map[x][i] = set_color;
					}
				}
				break;
			} else {
				break;
			}
		}

		// Up
		find_unti_color = false;
		for (var i = y - 1; i >= 0; i= i-1) {
			if (this.map[x][i] === unti_color) {
				find_unti_color = true;
			} else if (this.map[x][i] === set_color) {
				if (find_unti_color) {
					while (i < y) {
						i += 1;
						this.map[x][i] = set_color;
					}
				}
				break;
			} else {
				break;
			}
		}

		//Right Down
		find_unti_color = false;
		for (var i = x + 1, j = y + 1; i < this.size && j < this.size; i= i+1, j = j+1) {
			if (this.map[i][j] === unti_color) {
				find_unti_color = true;
			} else if (this.map[i][j] === set_color) {
				if (find_unti_color) {
					while (i > x && j > y) {
						i -= 1;
						j -= 1;
						this.map[i][j] = set_color;
					}
				}
				break;
			} else {
				break;
			}
		}

		// Right Up
		find_unti_color = false;
		for (var i = x + 1, j = y - 1; i < this.size && j >= 0; i= i+1, j = j-1) {
			if (this.map[i][j] === unti_color) {
				find_unti_color = true;
			} else if (this.map[i][j] === set_color) {
				if (find_unti_color) {
					while (i > x && j < y) {
						i -= 1;
						j += 1;
						this.map[i][j] = set_color;
					}
				}
				break;
			} else {
				break;
			}
		}

		//Left Down
		find_unti_color = false;
		for (var i = x - 1, j = y + 1; i >= 0 && j < this.size; i= i-1, j = j+1) {
			if (this.map[i][j] === unti_color) {
				find_unti_color = true;
			} else if (this.map[i][j] === set_color) {
				if (find_unti_color) {
					while (i < x && j > y) {
						i += 1;
						j -= 1;
						this.map[i][j] = set_color;
					}
				}
				break;
			} else {
				break;
			}
		}

		// Left Up
		find_unti_color = false;
		for (var i = x - 1, j = y - 1; i >=0 && j >= 0; i= i-1, j = j-1) {
			if (this.map[i][j] === unti_color) {
				find_unti_color = true;
			} else if (this.map[i][j] === set_color) {
				if (find_unti_color) {
					while (i < x && j < y) {
						i += 1;
						j += 1;
						this.map[i][j] = set_color;
					}
				}
				break;
			} else {
				break;
			}
		}

		return this;
	},
	
};

function showMap() {
	console.log("display Board:");
	for (var i=0; i<board.size; i++) {
		console.log(board.map[i]);
	}
}


// View
function draw() {
	var x = 0,
		y = 0,
		cell_size = config.cell_size,
		canvas = document.getElementById('board');
	if (!canvas || !canvas.getContext) {
		console.log("create Canvas fail.");
		return false;
	}
	var ctx = canvas.getContext('2d');
	ctx.fillStyle = "green";
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	var create_map = function(){
		while (y < canvas.height) {
			while (x < canvas.width) {
				ctx.fillRect(x, y, cell_size, cell_size);
				ctx.beginPath();
				ctx.strokeRect(x, y, cell_size, cell_size);
				x += cell_size;
			}
			y += cell_size;
			x = 0;
		}
	}();
	
	var draw_stone = function(x, y, color) {
		var size = config.stone_size;
		var center = cell_size / 2;
		
		// convert position
		x = x * cell_size;
		y = y * cell_size;
		
		ctx.beginPath();
		if (color === config.white) {
			ctx.fillStyle = "white";
		} else if (color === config.black) {
			ctx.fillStyle = "black";
		}
		ctx.arc(x+center, y+center, size, 0/180*Math.PI, 360/180*Math.PI);
		//ctx.arc(x,  y,    hankei,  radian開始, radian終点);
		ctx.lineCap = "round";
		ctx.stroke();
		ctx.fill();
	}
	
	var draw_map = function(board) {
		var size = board.size;
		var map = board.map;
		for (var x = 0; x < board.size; x+=1) {
			for (var y = 0; y < board.size; y+=1) {
				if (map[x][y] != 0) {
					draw_stone(x, y, map[x][y]);
				}
			}
		}
	}

	draw_map(board);
	return draw_stone;
}

// Control

var player = config.black;

function key(event) {
	var x = event.offsetX;
	var y = event.offsetY;
	x = Math.floor(x/config.cell_size);
	y = Math.floor(y/config.cell_size);
	var ret = board.put(x, y, player);
	
	draw();
	if (ret) {
		change_player();
	}
}

function change_player() {
	if (player === config.black) {
		player = config.white;
	} else {
		player = config.black;
	}
}

function Test() {
	var b = config.black;
	var w = config.white;
	board.init();
	showMap();
	
	board.put(3, 4, b);
	showMap();
	board.put(3, 3, w);
	showMap();
	board.put(2, 4, w);
	board.put(1, 4, b);
	showMap();
	draw();
}

Test();



