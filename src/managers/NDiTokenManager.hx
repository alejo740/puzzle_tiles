package managers;
import flambe.display.Font.TextAlign;
import math.NDiMath;
import math.NDiVector2D;
import flambe.animation.Ease;
import flambe.Component;
import flambe.display.FillSprite;
import flambe.display.Graphics;
import flambe.display.ImageSprite;
import flambe.display.PatternSprite;
import flambe.display.Sprite;
import flambe.display.Texture;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.math.Rectangle;
import flambe.script.Action;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import flambe.sound.Sound;
import flambe.swf.BitmapSprite;
import flambe.swf.Library;
import flambe.swf.MoviePlayer;
import flambe.System;
import game_objects.NDiLaser;
import globals.NDiGameGlobals;
import managers.NDiResourcesManager;
import scenes.components.NDiButton;
import scenes.components.NDiImage;
import scenes.components.NDiToken;
import scenes.components.NDiTokenStatic;
import scenes.NDiAbstractScene;
import globals.NDiGameConstants;
import flambe.scene.Scene;
import scenes.NDiGamePlayScene;
import scenes.popups.NDiPopupPuzzle;
import util.NDiFillLine;
import util.NDiLine;
import util.NDiMatchLine;
import util.NDiPatternLine;
import util.NDiProbabilityUtils;
import util.NDiRandomUtils;
/**
 * NDiTeravision
 * @author Edwin Cobos
 */
class NDiTokenManager extends Component
{
	public var gridTokens:Array<NDiToken>;
	public var isSelecting:Bool;
	private var gridWidth:Int;
	private var gridHeight:Int;
	private var gridSize:Int;
	private var gridDistance:Float;
	private var currentPattern:Array<NDiToken>;	
	private var linePattern:Array<NDiMatchLine>;		
	private var isJoker:Bool;
	private var parentScene:NDiGamePlayScene;
	//private var frequencyHistogramTokens:Map<String, Int>;
	private var frequencyMapPuzzle:Map<NDiTypeToken, Int>;
	private var iteratorTypeToken:Int;
	private var patternCobwebs:Array<NDiTokenStatic>;
	private var patternObstacles:Array<NDiLaser>;
	private var numObstacles:Int;
	private var entityTokens:Entity;
	private var entityObstacles:Entity;
	private var indexObstaclesConfig:Int;
	private var isDetectingObstacles:Bool;
	private var timerTimeoutAnimation:Float;
	private var totalTimerTimeoutAnimation:Float;
	private var totalTokensTimeout:Int;
	private var selectedTokensTimeout:Array<Int>;
	private var hidenTokens:Array<NDiToken>;
	private var smokeObject:MoviePlayer;
	private var countPushPizzas:Int;
	private var elapsedTimeToHint:Float;
	private var totalTimeToHint:Float;
	private var firstTimeHint:Bool;
	private var arrayTokensHint:Array<NDiToken>;
	private var isShuffleBocked:Bool;
	private var isShuffling:Bool;
	
	private var popupPuzzle:NDiPopupPuzzle;
	
	public var transform:Sprite;
	public var entity:Entity;
	
	/*CONSTRUCTOR*/
	public function new(parent:NDiGamePlayScene):Void
	{
		this.parentScene= parent;
		this.isJoker = false;
		this.isSelecting = false;
		this.gridWidth = 6;
		this.gridHeight = 6;
		this.gridSize = gridWidth * gridHeight;
		this.gridDistance = NDiGameConstants.TOKENS_DISTANCE;
		this.gridTokens = new Array<NDiToken>();
		this.currentPattern = new Array<NDiToken>();
		this.linePattern = new Array<NDiMatchLine>();
		this.patternCobwebs = new Array<NDiTokenStatic>();
		this.patternObstacles = new Array<NDiLaser>();
		this.numObstacles = 4;
		this.indexObstaclesConfig = -1;
		this.isDetectingObstacles = false;
		this.timerTimeoutAnimation = 0;
		this.totalTimerTimeoutAnimation = 6;
		this.totalTokensTimeout = 10;
		
		this.elapsedTimeToHint = 0;
		this.totalTimeToHint = 6;
		this.firstTimeHint = true;
		this.arrayTokensHint = new Array<NDiToken>();
		
		this.selectedTokensTimeout = new Array<Int>();
		this.hidenTokens = new Array<NDiToken>();
		
		
		this.transform = new Sprite();
		this.entityTokens = new Entity();
		this.entityObstacles = new Entity();
		this.isShuffleBocked = false;
		this.isShuffling = false;
		this.popupPuzzle = new NDiPopupPuzzle();
		
		//this.frequencyHistogramTokens = new Map<String, Int>();
		this.frequencyMapPuzzle = new Map<NDiTypeToken, Int>();
		this.iteratorTypeToken = 0;
		this.countPushPizzas = 0;
		
	}
	
	/*
	 INIT CONFIGURATION
	 **/
	private function loadTokens():Void
	{
		/*Init Histogram*/
		for (i in 1...NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN.length)
		{
			this.frequencyMapPuzzle.set(NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[i], 0);
		}
		
		/*Init Grid*/
		var probabilities:Map<NDiTypeToken, Float> = this.calculateProbabilities();
		for (j in 0...gridHeight)
		{
			for(i in 0...gridWidth)
			{
				var index:Int = (j * gridWidth) + i;
				///var selectedTokenRandom:Int = Math.floor( NDiRandomUtils.getRandomFloat(0, typeTokens.length) );				
				gridTokens[index] = this.newToken(i, j, probabilities);
				
				var sizeWidth:Float = (NDiGameConstants.TOKENS_WIDTH * this.gridWidth) + (this.gridDistance * (this.gridWidth - 1));
				var sizeHeight:Float = (NDiGameConstants.TOKENS_HEIGHT * this.gridHeight) + (this.gridDistance * (this.gridHeight - 1));
				var dx = ((NDiGameConstants.TOKENS_WIDTH+gridDistance) * (i))+NDiGameConstants.TOKENS_WIDTH*0.5;
				var dy = ((NDiGameConstants.TOKENS_HEIGHT + gridDistance) * (j)) + NDiGameConstants.TOKENS_HEIGHT*0.5;
				dx = dx - sizeWidth*0.5;
				dy = dy - sizeHeight*0.5;
				
				gridTokens[index].transform.x._ = dx;
				gridTokens[index].transform.y._ = dy;
				
				gridTokens[index].addToEntity();				
				this.entityTokens.addChild(gridTokens[index].entity);
				
				gridTokens[index].transform.pointerDown.connect(this.handlePointerDown);
				gridTokens[index].transform.pointerMove.connect(this.handlePointerMove);
				System.pointer.up.connect(this.handlePointerUp);
			}			
		}
		//trace(this.frequencyHistogramTokens);
		//this.shuffle();
	}
	
	private function calculateProbabilities():Map<NDiTypeToken, Float>
	{		
		//var probabilities:Map<NDiTypeToken, Float> = cast NDiProbabilityUtils.createNormalProbabilities(NDiGameConstants.TOKENS_PROBABILITY);
		//var probabilities:Map<NDiTypeToken, Float> = cast NDiProbabilityUtils.createFilteredProbability(NDiGameConstants.TOKENS_PROBABILITY, [NDiTypeToken.NDI_TYPE_TURTLE_PIZZA]);
		//var probabilities:Map<NDiTypeToken, Float> = cast NDiProbabilityUtils.createModifiedProbability(NDiGameConstants.TOKENS_PROBABILITY, NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER, 0.6);
		
		//trace(this.frequencyMapPuzzle);
		//trace("CALCULATE - PROBABILITIES");
		var playerLife:Float = this.parentScene.getPlayerPercentLife();
		//trace("PERCENT: " + playerLife);
		var probabilities:Map<NDiTypeToken, Float> = null;
		
		if (playerLife == 1){
			probabilities = cast NDiProbabilityUtils.createFilteredProbability(NDiGameConstants.TOKENS_PROBABILITY, [NDiTypeToken.NDI_TYPE_TURTLE_PIZZA]);
		}else if (playerLife < 0.5){
			probabilities = cast NDiProbabilityUtils.createModifiedProbability(NDiGameConstants.TOKENS_PROBABILITY, NDiTypeToken.NDI_TYPE_TURTLE_PIZZA, 0.19);
		}else{
			probabilities = cast NDiProbabilityUtils.createNormalProbabilities(NDiGameConstants.TOKENS_PROBABILITY);
		}
		//trace(probabilities);
		return probabilities;
	}
	
	private function checkPuzzleFrequency(_probabilities:Map<NDiTypeToken, Float>):Map<NDiTypeToken, Float>
	{
		//trace("CHECK - FREQUENCY");
		var probabilities:Map<NDiTypeToken, Float> = _probabilities;
		var probPizza:Float = probabilities.get(NDiTypeToken.NDI_TYPE_TURTLE_PIZZA);
		var probSplinter:Float = probabilities.get(NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER);
		
		
		if (probPizza > 0)
		{
			if (this.frequencyMapPuzzle.get(NDiTypeToken.NDI_TYPE_TURTLE_PIZZA) > 5)
			{
				trace("### REMOVE PIZZA");
				var percents:Map<NDiTypeToken, Float> = NDiProbabilityUtils.convertRangeToPercent(probabilities);
				var filter:Array<NDiTypeToken> = [NDiTypeToken.NDI_TYPE_TURTLE_PIZZA];
				if (probSplinter == 0)
				{
					filter.push(NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER);
				}
				probabilities = cast NDiProbabilityUtils.createFilteredProbability(percents, filter);
			}
		}
		
		if (probSplinter > 0)
		{
			if (this.frequencyMapPuzzle.get(NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER) > 4)
			{
				trace("### REMOVE SPLINTER");
				var percents:Map<NDiTypeToken, Float> = NDiProbabilityUtils.convertRangeToPercent(probabilities);
				var filter:Array<NDiTypeToken> = [NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER];
				if (probPizza == 0)
				{
					filter.push(NDiTypeToken.NDI_TYPE_TURTLE_PIZZA);
				}
				probabilities = cast NDiProbabilityUtils.createFilteredProbability(percents, filter);
			}
		}
		
		return probabilities;
	}
	
	private function getIndexToken(type:NDiTypeToken)
	{
		var value:Int = 0;
		for (i in 1...NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN.length)
		{
			if (NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[i] == type)
			{
				//indexSelected = i - 1;
				value = i;
				break;
			}
		}
		return value;
	}
	
	private function calculateToken(probabilities:Map<NDiTypeToken, Float>):Int
	{
		var indexSelected:Int = 0;
		if (this.frequencyMapPuzzle.get(NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER) == 0)
		{
			indexSelected = this.getIndexToken(NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER) - 1;
			
		}else if (this.parentScene.checkPushPizzas)
		{
			trace("PUSHHHH PIZZAS");
			indexSelected = this.getIndexToken(NDiTypeToken.NDI_TYPE_TURTLE_PIZZA) - 1;
			
			this.countPushPizzas++;
			if(this.countPushPizzas >= 2){
				this.countPushPizzas = 0;
				this.parentScene.checkPushPizzas = false;
			}
		}else{		
			probabilities = this.checkPuzzleFrequency(probabilities);
			var percentRandom:Float = NDiRandomUtils.getRandomFloat(0, 1);			
			for (i in 1...NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN.length)
			{
				var p:Float = probabilities.get(NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[i]);
				if (percentRandom < p)
				{
					indexSelected = i-1;
					break;
				}
			}		
		}
		return indexSelected;
	}
	
	private function predefinedToken(index:Int):Int
	{
		for (i in 0...NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN.length)
		{
			if (NDiGameConstants.ARRAY_DEBUG_TOKENS[index] == NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[i])
			{
				return (i-1);
			}
		}
		return 0;
	}
	
	/**
	 * Function to create a new token in a specific position of grid
	 * @param	posX
	 * @param	posY
	 * @return New token created.
	 */
	private function newToken(posX:Int, posY:Int, probabilities:Map<NDiTypeToken, Float>):NDiToken
	{
		var index:Int = (posY * gridWidth) + posX;
		
		var selectedTokenIndex = this.calculateToken(probabilities);
		
		
		/**
		 * TO DEBUG
		 */
		//var selectedTokenIndex:Int = this.predefinedToken(index);
		
		var tmp:Library = NDiResourcesManager.getInstance().loadSetAnimations(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.PACK_ANIMATIONS_TOKENS);
		var newTokenObject = new NDiToken(tmp);
		//newTokenObject.loop(NDiGameConstants.ARRAY_PREFIX_ANIMATION_TOKEN[selectedTokenIndex]+"idle");
		newTokenObject.indexTypeToken = selectedTokenIndex;
		newTokenObject.tokenName = NDiGameConstants.ARRAY_PREFIX_ANIMATION_TOKEN[selectedTokenIndex];
		newTokenObject.animationIdle();
		newTokenObject.gridPosition.x = posX;
		newTokenObject.gridPosition.y = posY;
		newTokenObject.type = NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[selectedTokenIndex + 1];
		newTokenObject.tokenColor = NDiGameConstants.ARRAY_COLOR_TOKEN[selectedTokenIndex];
		
		var currentFrequency:Int = this.frequencyMapPuzzle.get(newTokenObject.type);
		this.frequencyMapPuzzle.set(newTokenObject.type, currentFrequency + 1);
		//assignType(selectedTokenRandom, newTokenObject);		
		return newTokenObject;
	}
	
	private function checkReversePattern(selectedToken:NDiToken):Bool
	{
		if (selectedToken.isSelected)
		{
			if (this.currentPattern.length > 1)
			{
				var secondLast:NDiToken = this.currentPattern[this.currentPattern.length - 2];
				if (secondLast == selectedToken)
				{
					this.isJoker = false;					
					this.currentPattern[this.currentPattern.length - 1].animationSelectedOff();
					this.currentPattern[this.currentPattern.length - 1].isSelected = false;
					this.linePattern[this.linePattern.length - 1].owner.dispose();
					this.linePattern.pop();
					this.currentPattern.pop();
					this.playSoundTokens(secondLast.type);
					return false;
				}
			}
		}
		return true;
	}
	
	
	public function unSelectTokens()
	{
		var selectedTokens:Array<NDiToken> = this.currentPattern;
		for (index in 0...selectedTokens.length)
		{
			var tmp:NDiToken = selectedTokens[index];
			tmp.animationSelectedOff();
			tmp.isSelected = false;
		}
		selectedTokens.splice(0, selectedTokens.length);
		this.isSelecting = false;
	}
	
	
	
	
	/**
	 * Function to user when is touching any token.
	 * @param	selectedToken
	 */
	public function selectToken(selectedToken:NDiToken):Void
	{
		if (!this.isSelecting)
			return;
			
		if (!this.checkReversePattern(selectedToken))
			return;
			
		if (selectedToken.isSelected)
			return;
		
		var posx:Int = cast(selectedToken.gridPosition.x, Int);
		var posy:Int = cast(selectedToken.gridPosition.y, Int);		
		
		if (!this.checkTokenPosition(posx, posy, selectedToken.type))
			return;
			
		if (!this.detectObstacles(posx, posy))
			return;
			
		this.playSoundTokens(selectedToken.type);
		this.createLine(selectedToken);
		selectedToken.animationSelectedOn();
		selectedToken.isSelected = true;
		
		this.currentPattern.push(selectedToken);
	}
	
	/**
	 Check if the current position of token selected is valid contiguous
	 **/
	private function checkTokenPosition(px:Float, py:Float, typeSelected:NDiTypeToken):Bool
	{
		if (currentPattern.length == 0)
			return true;
		else {
			var posx:Int = cast(currentPattern[currentPattern.length - 1].gridPosition.x, Int);
			var posy:Int = cast(currentPattern[currentPattern.length - 1].gridPosition.y, Int);
			
			if (posx == px || posy == py) {
				if (Math.abs(posx - px) == 1 || Math.abs(posy - py) == 1) {
					if (checkValidType(typeSelected))
						return true;
				}
			}
		}
		return false;
	}
	
	/**
	 Check if the current token selected is valid according with game rules
	 **/
	private function checkValidType(typeSelected:NDiTypeToken):Bool
	{
		//trace(currentPattern.length);
		var lastToken:NDiTypeToken = currentPattern[currentPattern.length - 1].type;
		
		if (lastToken == NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER) {
			isJoker = true;
		}
		
		if (typeSelected == lastToken)
		{
			//trace("COLOR");
			return true;
		}
		
		if (typeSelected == NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER) {
			//trace("JOKER IN");
			isJoker = true;
			return true;
		}
		
		if (isJoker) {
			//trace("JOKER OUT");
			isJoker = false;
			return true;
		}
		
		return false;
	}
	
	/**
	 Check if there is a valid Match and clean the currentPattern
	 **/
	public function validatePattern():Void
	{
		if (currentPattern.length > 1)
		{
			this.firstTimeHint = true;
			this.isShuffleBocked = true;
			this.elapsedTimeToHint = 0;
			var matchingFrequencyMap:Map<String, Int> = new Map<String, Int>();
			
			var arrayNDiTypeTurtle:Array<NDiTypeToken> = NDiTypeToken.createAll();
			for (p in arrayNDiTypeTurtle)
			{
				var str:String = p.getName();
				matchingFrequencyMap.set(str, 0);
			}
			matchingFrequencyMap.set(NDiGameConstants.TOTAL_TOKENS_TYPE, 0);
			
			var thereTurtles:Bool = false;
			for (p in currentPattern)
			{
				var tmp:NDiToken = cast(p, NDiToken);
				
				if (tmp.type != NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER && 
				tmp.type != NDiTypeToken.NDI_TYPE_TURTLE_PIZZA)
				{
					thereTurtles = true;
				}
				
				var currentFreq:Int = this.frequencyMapPuzzle.get(tmp.type);
				this.frequencyMapPuzzle.set(tmp.type, currentFreq - 1 );
				
				var typeString:String = tmp.type.getName();
				var frequency:Int = matchingFrequencyMap.get(typeString) + 1;
				matchingFrequencyMap.set(typeString, frequency);
				
				tmp.entity.add(new Script()); //Needed to run sequence
				var fn1:CallFunction = new CallFunction(tmp.animationOff);
				var fn2:CallFunction = new CallFunction(tmp.delete);
				var seq:Sequence = new Sequence([fn1, new Delay(0.6666666666), fn2]);
				tmp.entity.get(Script).run(seq);
			}
			
			//matchingFrequencyMap.set("numTurtles", );
			
			var totalMatch:Int = 0;
			var it:Iterator<String> = matchingFrequencyMap.keys();
			//for (p in arrayNDiTypeTurtle)
			for (p in it)
			{				
				var typeString:String = p;
				var value:Int = matchingFrequencyMap.get(typeString);
				totalMatch += value;
			}
			matchingFrequencyMap.set(NDiGameConstants.TOTAL_TOKENS_TYPE, totalMatch);
			
			this.parentScene.checkPopupTurtleAttack(thereTurtles, matchingFrequencyMap);
			/*
			if (thereTurtles)
			{
				trace("#### thereTurtles");
				this.parentScene.sendBlockToPuzzle(true, NDI_POPUP_TURTLE_ATTACK);
			}
			*/
			
			var seq:Sequence = new Sequence([new Delay(0.6),
			new CallFunction(function() {
					//trace(matchingFrequencyMap);
					this.parentScene.attackSystem(matchingFrequencyMap);
					this.renewToken();
					
					/*CLEAN TEMP VARS*/			
					//arrayNDiTypeTurtle.splice(0, arrayNDiTypeTurtle.length);
					//arrayNDiTypeTurtle = null;
					var itMatchingMap:Iterator<String> = matchingFrequencyMap.keys();
					for ( p in itMatchingMap)
					{
						matchingFrequencyMap.remove(p);
					}
					matchingFrequencyMap = null;
					
				}
			)]);
			this.owner.get(Script).run(seq);
			this.playSoundDisappear();			
			
		}else {
			for (p in this.currentPattern)
			{
				var tmp:NDiToken = cast(p, NDiToken);
				tmp.animationSelectedOff();
				tmp.isSelected = false;
			}
		}
		for (p in this.linePattern)
		{
			var tmp:NDiLine = cast(p, NDiLine);
			//trace("DELETE LINEE "+tmp.nameLine);
			p.owner.dispose();
		}
		//linePattern[0].owner.dispose();
		this.linePattern.splice(0, this.linePattern.length);		
		
		this.currentPattern.splice(0, this.currentPattern.length);//Clean pattern
		this.isJoker = false;
	}

	/**
	 * Function to delete tokens of pattern and create new tokens.(Version 1)
	 */
	private function renewToken():Void //Version 1
	{
		//this.blockPuzzle(NDI_POPUP_TURTLE_ATTACK);		
		var probabilities:Map<NDiTypeToken, Float> = this.calculateProbabilities();
		var countSpace:Int;
		var thereSpaces:Bool = false;
		for(i in 0...gridWidth)
		{
			countSpace = 0;
			for (j in 0...gridHeight)
			{
				var jj:Int = (gridHeight - 1) - j;
				var index:Int = (jj * gridWidth) + i;
				
				if (gridTokens[index] != null && gridTokens[index].isDead)
				{					
					countSpace++;
				}else {
					if (countSpace > 0)
					{
						if (gridTokens[index] != null)
						{
							var dy = gridTokens[index].transform.y._ + ((NDiGameConstants.TOKENS_HEIGHT + gridDistance) * countSpace);
							gridTokens[index].transform.y.animateTo(dy, 0.4, Ease.bounceOut);
							gridTokens[index].gridPosition.y = jj + countSpace;						
							var index2:Int = ((jj + countSpace) * gridWidth) + i;
							gridTokens[index2] = gridTokens[index];
							gridTokens[index] = null;
						}
					}
				}
			}
			//trace("Space " + i + " : " + countSpace );			
			for (s in 0...countSpace) 
			{
				thereSpaces = true;
				var posY:Int = (countSpace-1) - s;				
				var posX:Int = cast(i, Int);
				var index:Int = (posY * gridWidth) + posX;
				//gridTokens[index].dispose();
				gridTokens[index] = null;
				gridTokens[index] = this.newToken(posX, posY, probabilities);
				
				var sizeWidth:Float = (NDiGameConstants.TOKENS_WIDTH * this.gridWidth) + (this.gridDistance * (this.gridWidth - 1));
				var sizeHeight:Float = (NDiGameConstants.TOKENS_HEIGHT * this.gridHeight) + (this.gridDistance * (this.gridHeight - 1));
				var dx = ((NDiGameConstants.TOKENS_WIDTH + gridDistance) * (posX)) + NDiGameConstants.TOKENS_WIDTH * 0.5;
				var dy = ((NDiGameConstants.TOKENS_HEIGHT + gridDistance) * (posY)) + NDiGameConstants.TOKENS_HEIGHT * 0.5;		
				dx = dx - sizeWidth *0.5;
				dy = dy - sizeHeight * 0.5;
				
				gridTokens[index].transform.x._ = dx;
				gridTokens[index].transform.y._ = (-sizeHeight*0.5)-50;
				gridTokens[index].transform.y.animateTo(dy, 0.4, Ease.bounceOut);				
				
				//var newEntity:Entity = new Entity();
				//gridTokens[index].entity = newEntity;				
				//gridTokens[index].entity.add(gridTokens[index]);				
				this.gridTokens[index].addToEntity();
				this.entityTokens.addChild(this.gridTokens[index].entity);
				
				this.gridTokens[index].transform.pointerDown.connect(this.handlePointerDown);
				this.gridTokens[index].transform.pointerMove.connect(this.handlePointerMove);				
			}
		}
		
		if (thereSpaces)
		{
			var f1:CallFunction = new CallFunction(function() {
				this.isShuffleBocked = false;
				if (this.isShuffling)
				{
					this.shuffle();
				}				
			});
			var seq1:Sequence = new Sequence([new Delay(0.41), f1]);
			this.owner.get(Script).run(seq1);
		}
		
	}
	
	/**
	 * Function to delete tokens of pattern and create new tokens.(Version 2 incomplete)
	 */
	private function _renewToken():Void 
	{
		var typeTokenArray:Array<NDiTypeToken> =  NDiTypeToken.createAll();
		
		var countTypes:Array<Int> = new Array<Int>();
		for (q in 0...typeTokenArray.length)
			countTypes[q] = 0;
		
		for (q in 0...typeTokenArray.length)
		{
			for (p in currentPattern)
			{
				var tmp:NDiToken = cast(p, NDiToken);
				if (tmp.type == typeTokenArray[q])
				{
					countTypes[q]++;
				}
			}
		}
		
			//countTypes[q]
			for (p in 0...currentPattern.length)
			{
				for (q in 0...typeTokenArray.length)
				{
					if (typeTokenArray[q] == currentPattern[p].type)
					{
						
					}
				}
			}
		
		//trace(countTypes);
	}
	
	public function unBlockPuzzle()
	{
		this.popupPuzzle.hide();
	}
	
	public function blockPuzzle(popupType:NDiTypePopupPuzzle)
	{
		this.popupPuzzle.changeText(popupType);
		this.popupPuzzle.show();
	}
		
	/**
	 * Function to play scale sounds
	 */
	private function playSoundTokens(typeToken:NDiTypeToken)
	{
		if (typeToken == NDiTypeToken.NDI_TYPE_TURTLE_PIZZA)
		{
			NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.SOUND_TOKEN_PIZZA);
		}
		else if (typeToken == NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER)
		{
			NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.SOUND_TOKEN_SPLINTER);
		}
		else
		{
			var index:Int = this.currentPattern.length;
			if (index > NDiGameConstants.ARRAY_SOUND_TOKENS.length - 1)
			{
				index = NDiGameConstants.ARRAY_SOUND_TOKENS.length - 1;
			}
			NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.ARRAY_SOUND_TOKENS[index]);
		}
	}	
	
	/**
	 * Function to shuffle puzzle(Fisher–Yates shuffle algorithm)
	 */
	public function shuffle():Void
	{
		this.unSelectTokens();
		this.unSelectLines();
		this.isShuffling = true;
		if (this.isShuffleBocked)
			return;
		//trace("SHUFFLE");
		var m:Int = this.gridTokens.length;
		var t:NDiToken;
		var t1Data:NDiToken;
		var t2Data:NDiToken;
		var i:Int;
		while(m>0)
		{			
			i = Math.floor(Math.random() * m--);
			
			t1Data 					= new NDiToken(null);
			t1Data.gridPosition 	= this.gridTokens[m].gridPosition;
			t1Data.transform.x._ 	= this.gridTokens[m].transform.x._;
			t1Data.transform.y._ 	= this.gridTokens[m].transform.y._;
			
			t2Data 					= new NDiToken(null);
			t2Data.gridPosition 	= this.gridTokens[i].gridPosition;
			t2Data.transform.x._ 	= this.gridTokens[i].transform.x._;
			t2Data.transform.y._ 	= this.gridTokens[i].transform.y._;
			
			t = this.gridTokens[m];
			this.gridTokens[m] 					= this.gridTokens[i];
			this.gridTokens[m].gridPosition 	= t1Data.gridPosition;
			this.gridTokens[m].transform.x._ 	= t1Data.transform.x._;
			this.gridTokens[m].transform.y._ 	= t1Data.transform.y._;
			
			this.gridTokens[i] 				= t;
			this.gridTokens[i].gridPosition = t2Data.gridPosition;
			this.gridTokens[i].transform.x._			= t2Data.transform.x._;
			this.gridTokens[i].transform.y._			= t2Data.transform.y._;
			
			t1Data = null;
			t2Data = null;
			t = null;
		}
		this.isShuffling = false;
	}
	
	/**
	 * Function to replace the token on i position with a new token
	 * @param	i
	 */
	private function changeToken(i:Int):Void
	{
		var probabilities:Map<NDiTypeToken, Float> = this.calculateProbabilities();
		var pos:NDiVector2D = gridTokens[i].gridPosition;
		gridTokens[i].entity.dispose();
		gridTokens[i] = null;
		gridTokens[i] = this.newToken(cast pos.x, cast pos.y, probabilities);
		
		
		var sizeWidth:Float = (gridTokens[i].movie._.getNaturalWidth() * this.gridWidth) + (this.gridDistance * (this.gridWidth - 1));
		var sizeHeight:Float = (gridTokens[i].movie._.getNaturalHeight() * this.gridHeight) + (this.gridDistance * (this.gridHeight - 1));				
		var dx = ((gridTokens[i].movie._.getNaturalWidth()+gridDistance) * (pos.x))+gridTokens[i].movie._.getNaturalWidth()/2;
		var dy = ((gridTokens[i].movie._.getNaturalHeight() + gridDistance) * (pos.y)) + gridTokens[i].movie._.getNaturalHeight() / 2;
		dx = dx - sizeWidth / 2;
		dy = dy - sizeHeight / 2;
		
		gridTokens[i].transform.x._ = dx;
		gridTokens[i].transform.y._ = dy;
		
		gridTokens[i].addToEntity();	
		this.entityTokens.addChild(gridTokens[i].entity);
		
		gridTokens[i].movie._.pointerDown.connect(this.handlePointerDown);
		gridTokens[i].movie._.pointerMove.connect(this.handlePointerMove);
	}
	
	
	
	
	/**
	 *******************************
	 ***** LINES FUNCTIONS *******
	 *******************************
	 */
	
	public function unSelectLines()
	{
		var selectedLines:Array<NDiMatchLine> = this.linePattern;
		for (index in 0...selectedLines.length)
		{
			var tmp:NDiMatchLine = selectedLines[index];
			tmp.owner.dispose();
		}
		selectedLines.splice(0, selectedLines.length);
	}
	
	/**
	 * Function to create new lines between token's
	 * @param	currentToken
	 */
	private function createLine(currentToken:NDiToken)
	{
		if (this.currentPattern.length > 0)
		{
			//trace("NEW LINEEEEE");			
			var lineX1:Float = currentPattern[currentPattern.length - 1].transform.x._;
			var lineY1:Float = currentPattern[currentPattern.length - 1].transform.y._;
			
			var p0:NDiVector2D = new NDiVector2D(lineX1, lineY1);
			
			var lineX2:Float = currentToken.transform.x._;
			var lineY2:Float = currentToken.transform.y._;
			var p1:NDiVector2D = new NDiVector2D(lineX2, lineY2);
			
			var newLine:NDiMatchLine = new NDiMatchLine(p0, p1, NDiGameConstants.LINE_THICKNESS);
			
			//if (currentToken.type == NDiTypeToken.NDI_TYPE_TURTLE_PIZZA || currentToken.type == NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER)
			if (currentToken.type == NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER)
			{
				newLine.getLine().color = currentPattern[currentPattern.length - 1].tokenColor;
			}else{
				newLine.getLine().color = currentToken.tokenColor;
			}
			
			newLine.getLine().disablePointer();
			this.owner.addChild(newLine.addToEntity());
			
			/*Adjust Starting Point*/
			//this.adjustStartPoint(newLine);
			this.linePattern.push(newLine);
			//this.adjustLineJoin(newLine);
		}
	}
	
	
	/**
	 * Function to adjust that joins lines that come from diferent directions.
	 * @param	newLine
	 */
	private function adjustStartPoint(newLine:NDiMatchLine)
	{
		if (this.linePattern.length > 0)
		{
			if (this.linePattern[this.linePattern.length - 1].getLine().rotation._ != newLine.getLine().rotation._)
			{
				//trace("CHANGE DIRECTION");			
				var tmp:NDiVector2D;
				switch(newLine.getLine().rotation._)
				{
					case 0:
						tmp = new NDiVector2D(newLine.getLine().x._ - (NDiGameConstants.LINE_THICKNESS / 2), newLine.getLine().y._ );
						newLine.setStartingPoint(tmp);
						
					case 180:
						tmp = new NDiVector2D(newLine.getLine().x._ + (NDiGameConstants.LINE_THICKNESS / 2), newLine.getLine().y._ );
						newLine.setStartingPoint(tmp);
						
					case 90:
						tmp = new NDiVector2D(newLine.getLine().x._, newLine.getLine().y._ - (NDiGameConstants.LINE_THICKNESS / 2));
						newLine.setStartingPoint(tmp);
						
					case -90:
						tmp = new NDiVector2D(newLine.getLine().x._, newLine.getLine().y._ + (NDiGameConstants.LINE_THICKNESS / 2));
						newLine.setStartingPoint(tmp);
				}
			}
		}
	}
	
	
	
	
	
	/**
	 *******************************
	 ***** COBWEBS FUNCTIONS *******
	 *******************************
	 */
	
	/**
	 * Recursive function to get a new unique position
	 * @return NDiVector2D of new position.
	 */
	private function getPositionToCobweb():NDiVector2D
	{
		var posX:Int = Math.floor(NDiRandomUtils.getRandomFloat(0, this.gridWidth));
		var posY:Int = Math.floor(NDiRandomUtils.getRandomFloat(0, this.gridHeight));
		var position:NDiVector2D = new NDiVector2D(posX, posY);
		if (this.patternCobwebs.length > 0)
		{
			for (p in 0...this.patternCobwebs.length)
			{
				if (this.patternCobwebs[p].gridPosition.x == posX &&
				this.patternCobwebs[p].gridPosition.y == posY)
				{
					position = this.getPositionToCobweb();
					break;
				}
			}
		}
		
		return position;
	}
	
	/**
	 * Function to generate new group of random cobwebs
	 */
	public function createRandomCobwebs(numCobwebs:Int):Void
	{
		//trace("CREATE COBWEBBBBBBBBBBBBBBBBBBB");
		this.destroyCobwebs();
		for (index in 0...numCobwebs)
		{
			var tmpPositions:NDiVector2D = this.getPositionToCobweb();
			var gridIndex:Int = cast ((tmpPositions.y * gridWidth) + tmpPositions.x);
			var tmpTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.SPRITE_COBWEB);
			var newWeb:NDiTokenStatic = new NDiTokenStatic(tmpTexture);
			newWeb.centerAnchor();
			newWeb.tokenName = "cobweb";
			newWeb.gridPosition.x = tmpPositions.x;
			newWeb.gridPosition.y = tmpPositions.y;
			newWeb.type = NDiTypeToken.NDI_TYPE_TURTLE_NONE;
			newWeb.indexToken = gridIndex;
			
			newWeb.x._ = this.gridTokens[gridIndex].transform.x._;
			newWeb.y._ = this.gridTokens[gridIndex].transform.y._;
			this.gridTokens[gridIndex].isBlocked = true;
			
			this.entityObstacles.addChild(newWeb.addToEntity());
			this.patternCobwebs.push(newWeb);
		}
		//trace("END - CREATE COBWEBBBBBBBBBBBBBBBBBBB");
	}
	
	
	/**
	 * Function to delete all existing cobwebs.
	 */
	public function destroyCobwebs()
	{
		this.firstTimeHint = true;
		this.elapsedTimeToHint = 0;
		if (patternCobwebs.length > 0)
		{
			for (p in 0...this.patternCobwebs.length)
			{
				this.gridTokens[this.patternCobwebs[p].indexToken].isBlocked = false;
				this.patternCobwebs[p].owner.dispose();
			}
		}
		patternCobwebs.splice(0, patternCobwebs.length);
	}
	
	
	
	
	
	
	/**
	 *******************************
	 ***** OBSTACLES FUNCTIONS *******
	 *******************************
	 */ 
	
	public function createRandomObstacles():Void
	{
		this.destroyObstacles();
		this.isDetectingObstacles = true;
		var indexConfig:Int = Math.floor(NDiRandomUtils.getRandomFloat(0, NDiGameConstants.ARRAY_OBSTACLES_CONFIG.length));
		if (this.indexObstaclesConfig < 0)
		{
			this.indexObstaclesConfig = indexConfig;
		}else{
			while (indexConfig == this.indexObstaclesConfig)
			{
				indexConfig = Math.floor(NDiRandomUtils.getRandomFloat(0, NDiGameConstants.ARRAY_OBSTACLES_CONFIG.length));
			}
			this.indexObstaclesConfig = indexConfig;
		}
		///this.indexObstaclesConfig = 0; // Enable to debug
		for (obj in NDiGameConstants.ARRAY_OBSTACLES_CONFIG[this.indexObstaclesConfig])
		{
			var map:Map<String, Dynamic> = cast obj;
			var direction:String = map.get("direction");
			var lengthLaser:Int = map.get("length");
			var position:NDiVector2D = map.get("position");
			
			var index1:Int = ((cast position.y) * this.gridWidth) + (cast position.x);
			var laserP1:NDiVector2D = new NDiVector2D(0, 0);
			var laserP2:NDiVector2D = new NDiVector2D(0, 0);
			
			if (direction == "x")
			{
				laserP1.x = this.gridTokens[index1].transform.x._ - (NDiGameConstants.TOKENS_WIDTH*0.5)  - (gridDistance*0.5);
				laserP1.y = this.gridTokens[index1].transform.y._ - (NDiGameConstants.TOKENS_HEIGHT*0.5) - (gridDistance*0.5);
				
				laserP2.x = (laserP1.x + (NDiGameConstants.TOKENS_WIDTH * lengthLaser) + (this.gridDistance * (lengthLaser-1)) ) + (gridDistance);
				laserP2.y = laserP1.y;
			}
			else if (direction == "y")
			{
				laserP1.x = this.gridTokens[index1].transform.x._ - (NDiGameConstants.TOKENS_WIDTH*0.5) - (gridDistance*0.5);
				laserP1.y = this.gridTokens[index1].transform.y._ - (NDiGameConstants.TOKENS_HEIGHT*0.5) - (gridDistance*0.5);
				
				laserP2.x = laserP1.x;
				laserP2.y = (laserP1.y + (NDiGameConstants.TOKENS_HEIGHT * lengthLaser) + (this.gridDistance * (lengthLaser-1))) + (gridDistance);
			}
			
			var newLaser:NDiLaser = new NDiLaser(laserP1, laserP2);
			newLaser.direction = direction;
			
			this.entityObstacles.addChild(newLaser.addToEntity());
			this.patternObstacles.push(newLaser);
		}
	}
	
	 
	/**
	 * Function to delete all existing cobwebs.
	 */
	public function destroyObstacles()
	{
		if (this.patternObstacles.length > 0)
		{
			for (p in 0...this.patternObstacles.length)
			{
				this.patternObstacles[p].owner.dispose();
			}
		}
		patternObstacles.splice(0, patternObstacles.length);
		this.isDetectingObstacles = false;
	}
	
	private function detectObstacles(px:Float, py:Float):Bool
	{
		if (!this.isDetectingObstacles)
			return true;
		
		if (currentPattern.length == 0)
			return true;
		else {
			var posx:Int = cast(currentPattern[currentPattern.length - 1].gridPosition.x, Int);
			var posy:Int = cast(currentPattern[currentPattern.length - 1].gridPosition.y, Int);
			
			trace("DETECT OBSTACLES");
			if (this.patternObstacles.length > 0)
			{
				var index1:Int = (posy * this.gridWidth) + posx;
				var index2:Int = (cast py * this.gridWidth) + cast px;				
				var point0:NDiVector2D = new NDiVector2D(this.gridTokens[index1].transform.x._, this.gridTokens[index1].transform.y._);
				var point1:NDiVector2D = new NDiVector2D(this.gridTokens[index2].transform.x._, this.gridTokens[index2].transform.y._);
				var tmp:NDiFillLine = new NDiFillLine( point0 , point1, 18);
				
				for (index in 0...this.patternObstacles.length)
				{
					tmp.addToEntity();
					var isColider:Bool = this.checkCollisionObstacles(this.patternObstacles[index].owner, tmp.owner);
					tmp.owner.dispose();					
					if (isColider)
					{
						return false;
					}
					
				}
				tmp = null;
			}
		}
		return true;
	}
	
	private function checkCollisionObstacles(entity1:Entity, entity2:Entity):Bool
	{
		var rect2:Rectangle = Sprite.getBounds(entity2);
		
		var rect2P1:NDiVector2D = new NDiVector2D(rect2.x, rect2.y);
		var rect2P2:NDiVector2D = new NDiVector2D(rect2.x + rect2.width, rect2.y + rect2.height);
		var rect2p1middle:NDiVector2D = new NDiVector2D(rect2.x + (rect2.width * 0.5), rect2.y + (rect2.height * 0.5));
		
		if (Sprite.hitTest(entity1, rect2P1.x, rect2P1.y) != null)
		{
			return true;
		}
		
		if (Sprite.hitTest(entity1, rect2P1.x, rect2P2.y) != null)
		{
			return true;
		}
		
		if (Sprite.hitTest(entity1, rect2P2.x, rect2P1.y) != null)
		{
			return true;
		}
		
		if (Sprite.hitTest(entity1, rect2P2.x, rect2P2.y) != null)
		{
			return true;
		}
		if (Sprite.hitTest(entity1, rect2p1middle.x, rect2p1middle.y) != null)
		{
			return true;
		}
		
		return false;
	}
	
	
	
	
	
	public function goBackStateTokenHiden()
	{
		if (this.hidenTokens.length > 0)
		{
			for (p in 0...this.hidenTokens.length)
			{
				if (!this.hidenTokens[p].isDead)
				{
					this.hidenTokens[p].hide(false);
				}
			}
		}
		hidenTokens.splice(0, hidenTokens.length);
	}
	
	private function addSmokeAnimation(posX:Int, posY:Int, isPair:Bool)
	{
		var sizeWidth:Float = (NDiGameConstants.TOKENS_WIDTH * this.gridWidth) + (this.gridDistance * (this.gridWidth - 1));
		var sizeHeight:Float = (NDiGameConstants.TOKENS_HEIGHT * this.gridHeight) + (this.gridDistance * (this.gridHeight - 1));
		
		var dx = ((NDiGameConstants.TOKENS_WIDTH+gridDistance) * (posX))+NDiGameConstants.TOKENS_WIDTH*0.5;		
		dx = dx - (sizeWidth * 0.5);
		
		var dy = ((NDiGameConstants.TOKENS_HEIGHT + gridDistance) * (posY)) + NDiGameConstants.TOKENS_HEIGHT*0.5;
		dy = dy - sizeHeight * 0.5;
		
		if (isPair)
		{
			dx += NDiGameConstants.TOKENS_WIDTH * 0.5;
			dy += NDiGameConstants.TOKENS_HEIGHT * 0.5;
		}
		
		//var index:Int = ((posY) * this.gridWidth) + (posX);
		var tmp:Library = NDiResourcesManager.getInstance().loadSetAnimations(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.PACK_SMOKE_ANIMATION);
		this.smokeObject = new MoviePlayer(tmp);
		this.smokeObject.loop(NDiGameConstants.NAME_SMOKE_ANIMATION);
		
		var tmpEntity:Entity = new Entity().add(this.smokeObject);
		var tmpTransform:Sprite = new Sprite();
		tmpTransform.x._ = dx;// this.gridTokens[index].transform.x._;
		tmpTransform.y._ = dy;// this.gridTokens[index].transform.y._;
		
		tmpEntity.add(tmpTransform);
		this.owner.addChild(tmpEntity);
		var seq:Sequence = new Sequence([new Delay(0.5833333333333333),
		new CallFunction(function() {
			this.smokeObject.owner.dispose();
			})
		]);
		this.owner.get(Script).run(seq);
	}
	
	public function hideTokens(sizeSmoke:Int)
	{
		this.goBackStateTokenHiden();
		
		var index:Int = 0;		
		var gridZoneX:Int = 0;
		var gridZoneY:Int = 0;		
		var posX:Int = 0;
		var posY:Int = 0;
		var isPair:Bool = true;
		if (sizeSmoke % 2 == 0)
			isPair = true;
		else
			isPair = false;
		
		if (!isPair)
		{
			posX =  Math.floor(NDiRandomUtils.getRandomFloat(0, 4));
			posY =  Math.floor(NDiRandomUtils.getRandomFloat(0, 4));
			
			this.addSmokeAnimation(posX+1, posY+1, isPair);
			for (row in 0...sizeSmoke)
			{
				for (col in 0...sizeSmoke)
				{
					gridZoneX = (posX - (col - 1))+1;
					gridZoneY = (posY - (row - 1))+1;
					index = (gridZoneY * this.gridWidth) + gridZoneX;
					this.gridTokens[index].hide();
					this.hidenTokens.push(this.gridTokens[index]);
				}
			}
		}else {
			posX =  Math.floor(NDiRandomUtils.getRandomFloat(0, 3));
			posY =  Math.floor(NDiRandomUtils.getRandomFloat(0, 3));
			
			this.addSmokeAnimation(posX + 1, posY + 1, isPair);
			for (row in 0...sizeSmoke)
			{
				for (col in 0...sizeSmoke)
				{
					gridZoneX = (posX + col);
					gridZoneY = (posY + row);
					index = (gridZoneY * this.gridWidth) + gridZoneX;
					this.gridTokens[index].hide();
					this.hidenTokens.push(this.gridTokens[index]);
				}
			}
			
		}
	}
	
	
	
	/**
	 * Recursive function to get a new unique index of token
	 * @return
	 */
	private function getUniqueIndexTimeout():Int
	{
		var value:Int =  Math.floor(NDiRandomUtils.getRandomFloat(0, this.gridTokens.length));
		if (this.selectedTokensTimeout.length > 0)
		{
			for (i in 0...this.selectedTokensTimeout.length)
			{
				if (value == this.selectedTokensTimeout[i] || this.gridTokens[value].isDead)
				{
					value = this.getUniqueIndexTimeout();
					break;
				}
			}
		}
		return value;
	}
	
	/**
	 * Funtion to play "timeout" animation on random tokens
	 * @param	dt: Delta time
	 */
	private function updateTimeoutAnimation(dt:Float)
	{
		if (this.timerTimeoutAnimation >= this.totalTimerTimeoutAnimation)
		{
			//var index:Int = Math.floor(NDiRandomUtils.getRandomFloat(0, this.gridTokens.length));
			for (index in 0...this.totalTokensTimeout)
			{
				this.getUniqueIndexTimeout();
				var gridIndex:Int = this.getUniqueIndexTimeout();
				//this.gridTokens[gridIndex].play(this.gridTokens[gridIndex].tokenName + "timeout");
				this.gridTokens[gridIndex].animationTimeOut();
				this.selectedTokensTimeout[index] = gridIndex;
			}
			this.timerTimeoutAnimation = 0;
		}
		this.timerTimeoutAnimation += dt;
	}
	
	private function checkMatch(posX:Int, posY:Int, collection:Array<NDiToken>)
	{
		var currentIndex:Int = (posY * this.gridWidth) + posX;
		var newIndex:Int = 0;
		
		var px:Int = posX + 1;
		if (px < this.gridWidth)
		{
			newIndex = (posY * this.gridWidth) + px;
			if (this.gridTokens[newIndex].type == this.gridTokens[currentIndex].type || 
			this.gridTokens[newIndex].type == NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER ||
			this.gridTokens[currentIndex].type == NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER)
			{
				if (!this.gridTokens[newIndex].isBlocked)
				{
					collection.push(this.gridTokens[newIndex]);
					this.checkMatch(px, posY, collection);
					return;
				}
			}
		}
			
		var py:Int = posY + 1;
		if (py < this.gridHeight)
		{
			newIndex = (py * this.gridWidth) + posX;
			if (this.gridTokens[newIndex].type == this.gridTokens[currentIndex].type || 
			this.gridTokens[newIndex].type == NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER ||
			this.gridTokens[currentIndex].type == NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER)
			{
				if (!this.gridTokens[newIndex].isBlocked)
				{
					collection.push(this.gridTokens[newIndex]);
					this.checkMatch(posX, py, collection);
					return;
				}
			}
		}
	}
	
	public function findMatch_v2()
	{
		trace("FIND MATCH");
		//var arrayTokensHint:Array<NDiToken> = new Array<NDiToken>();
		this.arrayTokensHint.splice(0, this.arrayTokensHint.length);	
		var isFound:Bool = false;
		do {
			var i:Int = NDiRandomUtils.getRandomInt(0, this.gridWidth-1);
			var j:Int = NDiRandomUtils.getRandomInt(0, this.gridHeight - 1);
			
			var index:Int = (j * gridWidth) + i;
			this.arrayTokensHint.push(this.gridTokens[index]);			
			this.checkMatch(i, j, this.arrayTokensHint);
			if (this.arrayTokensHint.length > 1)
			{
				isFound = true;
				break;
			}
			this.arrayTokensHint.splice(0, this.arrayTokensHint.length);
			
		}while (!isFound);
		
		
		
	}
	
	public function findMatch_v1()
	{
		trace("FIND MATCH");
		//var arrayTokensHint:Array<NDiToken> = new Array<NDiToken>();
		this.arrayTokensHint.splice(0, this.arrayTokensHint.length);
		var jBreak:Bool = false;
		for (j in 0...this.gridHeight)
		{			
			jBreak = false;
			for(i in 0...this.gridWidth)
			{
				var index:Int = (j * gridWidth) + i;
				trace("INDEX: "+index + " --- " + this.gridTokens[index].isBlocked);
				//trace(index);
				//trace(this.gridTokens);
				if (!this.gridTokens[index].isBlocked)
				{
					this.arrayTokensHint.push(this.gridTokens[index]);
					this.checkMatch(i, j, this.arrayTokensHint);
					
					if (this.arrayTokensHint.length > 1)
					{
						jBreak = true;
						break;
					}
				}
				this.arrayTokensHint.splice(0, this.arrayTokensHint.length);
			}
			if (jBreak)
				break;
		}
	}
	
	private function showHint()
	{
		for (tk in this.arrayTokensHint)
		{
			tk.animationTimeOut();
		}
	}
	
	private function updateTimeToHint(dt:Float)
	{
		if (this.elapsedTimeToHint >= this.totalTimeToHint)
		{
			if (this.firstTimeHint) {
				trace("NEW HINT...");
				this.findMatch_v1();
				this.firstTimeHint = false;
			}
			this.showHint();
			this.elapsedTimeToHint = 0;
		}
		this.elapsedTimeToHint += dt;
	}
	
	
	private function playSoundDisappear()
	{
		NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.SOUND_TOKEN_DISAPPEAR);
	}
	
	/**
	 *******************************
	 ***** DEFAULT FUNCTIONS *******
	 *******************************
	 */
	/*Event Signals*/
	private function handlePointerDown(event:PointerEvent):Void {		
		var selectedBitmap:BitmapSprite = cast(event.hit, BitmapSprite);
		var selectedToken:NDiToken = cast selectedBitmap.owner.parent.parent.firstComponent;
		//hit = flambe.swf.BitmapSprite (@108f2559)
		trace(selectedToken.type);
		this.isSelecting = true;
		selectToken(selectedToken);		
	}
	
	private function handlePointerMove(event:PointerEvent):Void {		
		var selectedBitmap:BitmapSprite = cast(event.hit, BitmapSprite);
		var selectedToken:NDiToken = cast selectedBitmap.owner.parent.parent.firstComponent;
		selectToken(selectedToken);
	}
	
	private function handlePointerUp(event:PointerEvent):Void {		
		if (this.isSelecting == true)
		{
			this.isSelecting = false;
			validatePattern();
		}
	}
		
	override public function onAdded():Void
    {
		/*PUZZLE BACKGROUND*/
		var texture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.PUZZLE_BACKGROUND);
		var bckg: ImageSprite = new ImageSprite(texture);
		bckg.centerAnchor();
		//bckg.y._ = NDiGameConstants.GAME_HEIGHT * 0.1;
		//bckg.x._ = NDiGameConstants.GAME_WIDTH * 0.4;
		this.owner.addChild(new Entity().add(bckg));
		
		//trace("INIT TOKEN MANAGERRR " + gridTokens.length);
		this.owner.add(new Script());
		this.owner.addChild(this.entityTokens);
		this.owner.addChild(this.entityObstacles);
		this.owner.add(transform);
		this.transform.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5)+30;
		this.transform.x._ = (NDiGameConstants.GAME_WIDTH / 4);
		//this.transform.setScale(0.9);
		this.loadTokens();
		
		this.owner.addChild(new Entity().add(this.popupPuzzle));
	}
	
	override public function onRemoved():Void
	{
		super.onRemoved();
	}

	override public function onUpdate(dt:Float):Void
	{
		this.updateTimeToHint(dt);
	}
	
	public function addToEntity():Entity
	{
		this.entity = new Entity();
		this.entity.add(this);
		return this.entity;
	}
	
}