package globals;
import flambe.display.Sprite;
import math.NDiVector2D;

enum NDiTypeScene
{
	NDI_TYPE_SCENE_NONE;
	NDI_TYPE_SCENE_LOADING;
	NDI_TYPE_SCENE_TEST;
	NDI_TYPE_SCENE_INTRO;
	NDI_TYPE_SCENE_MAINMENU;
	NDI_TYPE_SCENE_GAMEPLAY;
	NDI_TYPE_SCENE_CREDITS;
	NDI_TYPE_SCENE_SPLASH_NDI;
	NDI_TYPE_SCENE_SPLASH_NICKELODEON;
	NDI_TYPE_SCENE_TUTORIAL;
}

enum NDiTypeToken
{
	NDI_TYPE_TURTLE_NONE;
	NDI_TYPE_TURTLE_DONATELLO; 	//PURPLE
	NDI_TYPE_TURTLE_RAPHAEL; 		//RED
	NDI_TYPE_TURTLE_MICHELANGELO; //ORANGE
	NDI_TYPE_TURTLE_LEONARDO; 	//BLUE
	NDI_TYPE_TURTLE_SPLINTER;		//GRAY
	NDI_TYPE_TURTLE_PIZZA;		//PIZZA
}

enum NDiTypeEnemy
{
	NDI_TYPE_ENEMY_NONE;//Default
	NDI_TYPE_ENEMY_MOUSER;	
	NDI_TYPE_ENEMY_FOOTBOT;
	NDI_TYPE_ENEMY_KRANG;
	NDI_TYPE_ENEMY_RAHZAR;
	NDI_TYPE_ENEMY_SNAKEWEED;
	NDI_TYPE_ENEMY_SPIDERBYTEZ;
	NDI_TYPE_ENEMY_SHREDDER;
}

enum NDiTypePopupPuzzle
{
	NDI_POPUP_TURTLE_ATTACK;
	NDI_POPUP_ENEMY_ATTACK;	
	NDI_POPUP_NEW_ENEMY;
}

enum NDiVarsToSave
{
	SCORE;
	SCORE_2;
	SCORE_3;
	MUTE_MUSIC;
	MUTE_SOUNDS;
}

class NDiGameConstants
{
	// CONFIG ASSETS.
	public static var CONFIG_ASSET_CONFIG_XML = "Config.xml";
	public static var CONFIG_ASSET_LOCALIZATION_XML = "Localization.xml";
	public static var CONFIG_ASSET_CREDITS_XML = "Credits.xml";
	
    /* ASSET PACKAGES */
    public static var ASSET_PACKAGE_CONFIG:String = "config";
    public static var ASSET_PACKAGE_LOADING:String = "assets_loading";
    public static var ASSET_PACKAGE_GENERAL:String = "assets_general";
	/* Loading Package*/
	public static var BACKGROUND_LOADING:String = "loading_bg";
	public static var BAR_LOADING:String = "loading_bar";
	public static var ICON_BAR_LOADING:String = "loading_icon";
	
	/* General package*/
	public static var GAMEPLAY_BUTTON_PAUSE:String = "images/buttons/pause_button";
	public static var GAMEPLAY_PAUSEMENU_BACKGROUND:String 			= "images/panels/pause/frame";
	public static var GAMEPLAY_PAUSEMENU_BUTTON_RESUME:String 		= "images/buttons/pause/resume";
	public static var GAMEPLAY_PAUSEMENU_BUTTON_HELP:String 		= "images/buttons/pause/help";
	public static var GAMEPLAY_PAUSEMENU_BUTTON_SOUND_ON:String 	= "images/buttons/pause/soundON";
	public static var GAMEPLAY_PAUSEMENU_BUTTON_SOUND_OFF:String 	= "images/buttons/pause/soundOFF";
	public static var GAMEPLAY_PAUSEMENU_BUTTON_QUIT:String 		= "images/buttons/pause/quit";
	
	public static var GAMEPLAY_RESULTS_HIGHSCORE_FRAME:String 		= "images/decorations/newtopscore";
	public static var GAMEPLAY_RESULTS_BACKGROUND:String 			= "images/backgrounds/resultsBG";
	public static var GAMEPLAY_RESULTS_BUTTON_QUIT:String 			= "images/buttons/results/quit";
	public static var GAMEPLAY_RESULTS_BUTTON_REPLAY:String 		= "images/buttons/results/replay";
	public static var GAMEPLAY_RESULTS_TOP_SCORES:String			= "images/panels/results/topscores";
	
	public static var POPUP_EXIT_BUTTON_YES:String 		= "images/buttons/popupExit/btn_accept";
	public static var POPUP_EXIT_BUTTON_NO:String 		= "images/buttons/popupExit/btn_cancel";
	public static var POPUP_EXIT_BACKGROUND:String 		= "images/panels/popupExit/popup_bg";
	
	public static var ENEMYLIFEBAR_BACKGROUND:String 	= "images/hud/barenemy_bg";
	public static var ENEMYLIFEBAR:String 				= "images/hud/barenemy_blood";
	public static var ENEMY_ICON:String 				= "images/hud/barenemy_icon";
	
	public static var GENERALENEMY_ICON:String 		= "images/hud/enemy_icons/barenemy_icon";
	/*
	public static var MOUSER_ICON:String 			= "images/hud/enemy_icons/mouser_icon_enemy";
	public static var RAHZAR_ICON:String 			= "images/hud/enemy_icons/rahzar_icon_enemy";
	public static var FOOTBOT_ICON:String 			= "images/hud/enemy_icons/footbot_icon_enemy";
	public static var KRANGS_ICON:String 			= "images/hud/enemy_icons/kraang_icon_enemy";
	public static var SHREDDER_ICON:String 			= "images/hud/enemy_icons/shredder_icon_enemy";
	public static var SNAKEWEED_ICON:String 		= "images/hud/enemy_icons/snakeweed_icon_enemy";
	public static var SPIDERBYTEZ_ICON:String 		= "images/hud/enemy_icons/spiderBytez_icon_enemy";
	*/
	
	public static var PLAYERLIFEBAR_BACKGROUND:String 	= "images/hud/barlife_bg";
	public static var PLAYERLIFEBAR:String 				= "images/hud/barlife_blood";
	public static var PLAYERLIFE_ICON:String 			= "images/hud/barlife_icon";
	
	public static var MAINMENU_BACKGROUND:String 		= "images/backgrounds/mainscreenBG";
	public static var CREDITS_BACKGROUND:String 		= "images/backgrounds/creditsBG";
	public static var SPLASHNDI_BACKGROUND:String 		= "images/backgrounds/NDi"; //
	public static var SPLASHNICK_BACKGROUND:String 		= "images/backgrounds/Nick"; //
	public static var HUD_SCORE_BACKGROUND:String 		= "images/hud/scoreEmpty";
	public static var PUZZLE_BACKGROUND:String 			= "images/hud/puzzle_container";
	public static var MAINMENU_BUTTON_CREDITS:String 	= "images/buttons/mainscreen/btn_credits";
	public static var MAINMENU_BUTTON_SOUND:String 		= "images/buttons/mainscreen/btn_sound";
	public static var MAINMENU_BUTTON_SOUNDOFF:String 	= "images/buttons/mainscreen/btn_soundoff";
	public static var MAINMENU_BUTTON_PLAY:String 		= "images/buttons/mainscreen/btn_play";
	public static var BLOCKED_VINE:String 				= "images/panels/vine";
	public static var PATH_XML_CREDITS 					= "xml/Credits.xml";
	public static var CREDITS_BUTTON_BACK:String 		= "images/buttons/credits/back";
	public static var CREDITS_TITLE:String 				= "images/decorations/creditsTitle";
	
	
	
	
	/*TUTORIAL CONFIG*/	
	public static var ARRAY_TUTORIAL_TOKENS_STEP1:Array<NDiTypeToken> = [
	NDI_TYPE_TURTLE_MICHELANGELO,  NDI_TYPE_TURTLE_RAPHAEL,  NDI_TYPE_TURTLE_LEONARDO, NDI_TYPE_TURTLE_LEONARDO, NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_DONATELLO,
	NDI_TYPE_TURTLE_DONATELLO, NDI_TYPE_TURTLE_PIZZA, NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_RAPHAEL, NDI_TYPE_TURTLE_DONATELLO, NDI_TYPE_TURTLE_LEONARDO,
	NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_RAPHAEL, NDI_TYPE_TURTLE_DONATELLO, NDI_TYPE_TURTLE_LEONARDO, NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_RAPHAEL, 
	NDI_TYPE_TURTLE_DONATELLO, NDI_TYPE_TURTLE_LEONARDO, NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_PIZZA, NDI_TYPE_TURTLE_DONATELLO, NDI_TYPE_TURTLE_LEONARDO,
	NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_RAPHAEL, NDI_TYPE_TURTLE_DONATELLO, NDI_TYPE_TURTLE_LEONARDO, NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_RAPHAEL,
	NDI_TYPE_TURTLE_RAPHAEL, NDI_TYPE_TURTLE_DONATELLO, NDI_TYPE_TURTLE_LEONARDO, NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_RAPHAEL, NDI_TYPE_TURTLE_DONATELLO
	];
	public static var ARRAY_TUTORIAL_TOKENS_STEP2:Array<NDiTypeToken> = [
	NDI_TYPE_TURTLE_MICHELANGELO,  NDI_TYPE_TURTLE_RAPHAEL,  NDI_TYPE_TURTLE_DONATELLO, NDI_TYPE_TURTLE_SPLINTER, NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_DONATELLO,
	NDI_TYPE_TURTLE_DONATELLO, NDI_TYPE_TURTLE_PIZZA, NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_RAPHAEL, NDI_TYPE_TURTLE_DONATELLO, NDI_TYPE_TURTLE_LEONARDO,
	NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_RAPHAEL, NDI_TYPE_TURTLE_DONATELLO, NDI_TYPE_TURTLE_LEONARDO, NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_RAPHAEL, 
	NDI_TYPE_TURTLE_DONATELLO, NDI_TYPE_TURTLE_LEONARDO, NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_PIZZA, NDI_TYPE_TURTLE_DONATELLO, NDI_TYPE_TURTLE_LEONARDO,
	NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_RAPHAEL, NDI_TYPE_TURTLE_DONATELLO, NDI_TYPE_TURTLE_LEONARDO, NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_RAPHAEL,
	NDI_TYPE_TURTLE_RAPHAEL, NDI_TYPE_TURTLE_DONATELLO, NDI_TYPE_TURTLE_LEONARDO, NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_RAPHAEL, NDI_TYPE_TURTLE_DONATELLO
	];
	
	public static var ARRAY_TUTORIAL_TEXTS:Array<String> = [
	"tutorial|text_step1",
	"tutorial|text_step2",
	"tutorial|text_step3",	
	];
	

	
	
	/* Array of configurations of krang laser's */
	public static var ARRAY_OBSTACLES_CONFIG:Array < Array < Map < String, Dynamic >>> = [
		[
			//["direction" => "y", "length" => 4, "position" => new NDiVector2D(6, 6)],///TEST
			["direction" => "x", "length" => 2, "position" => new NDiVector2D(0, 1)],
			["direction" => "x", "length" => 2, "position" => new NDiVector2D(4, 1)],
			["direction" => "y", "length" => 3, "position" => new NDiVector2D(3, 3)],
			["direction" => "y", "length" => 2, "position" => new NDiVector2D(5, 4)]
		],
		[
			["direction" => "x", "length" => 4, "position" => new NDiVector2D(1, 5)],			
			["direction" => "y", "length" => 4, "position" => new NDiVector2D(1, 0)],
			["direction" => "x", "length" => 3, "position" => new NDiVector2D(2, 2)],
			["direction" => "y", "length" => 2, "position" => new NDiVector2D(5, 1)]
		],
		[
			["direction" => "y", "length" => 1, "position" => new NDiVector2D(2, 0)],			
			["direction" => "y", "length" => 2, "position" => new NDiVector2D(5, 0)],
			["direction" => "x", "length" => 2, "position" => new NDiVector2D(0, 2)],
			["direction" => "y", "length" => 2, "position" => new NDiVector2D(2, 2)],
			["direction" => "y", "length" => 2, "position" => new NDiVector2D(3, 3)],
			["direction" => "x", "length" => 3, "position" => new NDiVector2D(1, 5)]
		],
	];
	
	/* SPLASH DURATION */
	public static var SPLASH_DURATION:Int = 2000;
	
	/* CREDITS DURATION BY TITLE*/
	public static var CREDITS_DURATION:Int = 2000;
	
	/* SCORE VALUES */
	public static var SCORE_VALUE_COLOR:Float = 10;
	public static var SCORE_VALUE_PIZZA:Float = 50;
	public static var SCORE_VALUE_SPLINTER:Float = 100;
	
	/* FONTS */
	/*
	public static var FONT_ARIAL:String = "fonts/arial";
	public static var FONT_ARIAL_80:String = "fonts/arial80";
	public static var FONT_CALIBRI:String = "fonts/calibri";
	public static var FONT_SLANT:String = "fonts/slant_font";
	*/
	
	/* GAME VARS */
	public static var GAME_WIDTH:Float = 960;
	public static var GAME_HEIGHT:Float = 560;
	public static var LINE_THICKNESS = 8;
	public static var TOTAL_TOKENS_TYPE:String = "TOTAL_TOKENS";
	public static var TOTAL_TURTLES_TYPE:String = "TOTAL_TURTLES";
	public static var ATTACK_DMG:Float = 2;
	public static var ATTACK_COEF:Float = 1;
	
	
	/*PERCENT WEIGHT(This variables must sum up 1)*/
	public static var TOKENS_PROBABILITY:Map<NDiTypeToken, Float> = [
		NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO		=> 	0.20,	//20%
		NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL		=>	0.20,	//20%
		NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO	=>	0.20,	//20%
		NDiTypeToken.NDI_TYPE_TURTLE_LEONARDO		=>	0.20,	//20%		
		NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER		=>	0.10,	//10%
		NDiTypeToken.NDI_TYPE_TURTLE_PIZZA			=>	0.10	//10%
	];

	/*HELP*/
	
	
	
	
		
	/* TOKENS */
	public static var TOKENS_WIDTH:Int = 72;
	public static var TOKENS_HEIGHT:Int = 72;
	public static var TOKENS_DISTANCE:Float = 8;
	public static var PACK_ANIMATIONS_TOKENS:String = "images/animations/tmnt_tokens";
	public static var PACK_SMOKE_ANIMATION:String = "images/animations/tmnt_smoke";
	public static var NAME_SMOKE_ANIMATION:String = "vfx_smoke_anim";
	public static var ARRAY_ENUM_TYPE_TOKEN:Array<NDiTypeToken> = NDiTypeToken.createAll();
	public static var ARRAY_PREFIX_ANIMATION_TOKEN:Array<String> = [
		"tk_don_",
		"tk_rapha_",
		"tk_mike_",
		"tk_leo_",
		"tk_splinter_",
		"tk_pizza_",
		"tk_unknow_"];
		
	public static var SPRITE_COBWEB:String = "images/panels/tokens/web";		
	public static var ARRAY_COLOR_TOKEN:Array<Int> = [
		0xad57e3,	//PURPLE
		0xea3d3d,	//RED
		0xf39c1e, 	//ORANGE
		0x0ea0db,	//BLUE
		0x939393,	//GRAY *
		0xfff000	//PIZZA *
	];
		
	
	
	
	
	/*PLAYER*/
	public static var HEALTH_PARTICLES_PACK:String = "images/animations/turtles/health_particles";
	public static var HEALTH_PARTICLES_ANIMATION:String = "health_anim";
	public static var ARRAY_TYPE_TURTLES:Array<NDiTypeToken> = [ARRAY_ENUM_TYPE_TOKEN[1],
	ARRAY_ENUM_TYPE_TOKEN[2],
	ARRAY_ENUM_TYPE_TOKEN[3],
	ARRAY_ENUM_TYPE_TOKEN[4]];
	public static var PACK_ANIMATIONS_TURTLES:String = "images/animations/turtles/animationsTurtlesHUD";	
	public static var ARRAY_ANIMATION_PREFIX_TURTLES:Array<String> = [
	"donnie",
	"rapha",
	"mike",
	"leo"];
	public static var ARRAY_X_POSITION_TURTLES:Array<Float> = [
	60,
	154,
	293,
	417];	
	public static var PACK_ANIMATIONS_ATTACK_TURTLES:String = "images/animations/turtles/animationsTurtlesAttacksHUD";
	public static var ARRAY_POSITIONS_ANIMATIONS_ATTACK:Array<NDiVector2D> = [
	new NDiVector2D(300,25),
	new NDiVector2D(295,25),
	new NDiVector2D(195,185),	
	new NDiVector2D(200,190),	
	];
	public static var ARRAY_APPEAR_ORDER_ANIMATIONS:Array<NDiTypeToken> = [
	NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO,
	NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL,
	NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO,
	NDiTypeToken.NDI_TYPE_TURTLE_LEONARDO
	];
	
	
	
	
	
	/*ENEMIES*/
	public static var ARRAY_ENUM_TYPE_ENEMIES:Array<NDiTypeEnemy> = NDiTypeEnemy.createAll();
	public static var ARRAY_PACK_ANIMATIONS_ENEMIES:Array<String> = [
	"images/animations/enemies/Mouser",
	"images/animations/enemies/footBot",	
	"images/animations/enemies/Kraang",
	"images/animations/enemies/Rahzar",
	"images/animations/enemies/Snakeweed",
	"images/animations/enemies/Spiderbytez",
	"images/animations/enemies/Shredder",
	];
	public static var ARRAY_ANIMATION_PREFIX_ENEMIES:Array<String> = [
	"enm_mouser",
	"enm_footbot",		
	"enm_kraang",
	"enm_rahzar",
	"enm_snakeweed",	
	"enm_spiderbytez",
	"enm_shredder"
	];
	public static var COMBOATTACK_POSITIONS_OFFSET:Map<NDiTypeEnemy, NDiVector2D> =
	[
		NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER => new NDiVector2D(0,180),
		NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT => new NDiVector2D(-50,10),
		NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG => new NDiVector2D(-20,10),
		NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR => new NDiVector2D(-20,10),
		NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED => new NDiVector2D(-20,10),
		NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ => new NDiVector2D(-20,10),
		NDiTypeEnemy.NDI_TYPE_ENEMY_SHREDDER => new NDiVector2D(-20,10)
	];
	
	public static var ARRAY_POSITIONS_MOUSERS:Array<NDiVector2D> = [
	new NDiVector2D( (NDiGameConstants.GAME_WIDTH * 0.25), (NDiGameConstants.GAME_HEIGHT *0.5)-105 ), 
	new NDiVector2D(90, 145),//	new NDiVector2D(130, 295), 20 - 150
	new NDiVector2D(-90, 145),	
	new NDiVector2D(145, 0),
	new NDiVector2D( -130, 0)];
	
	public static var WEED_ANIMATION_PACK:String = "images/animations/enemies/weed";
	public static var WEED_ANIMATION_PREFIX:String = "weed_trap";
	
	
	
	
	/*SOUNDS*/
	public static var MUSIC_TMNT:String = "sounds/tmnt_theme";
	public static var SOUND_TOKEN_PIZZA:String = "sounds/tokens/token_pizza";
	public static var SOUND_TOKEN_SPLINTER:String = "sounds/tokens/token_splinter";
	public static var SOUND_TOKEN_DISAPPEAR:String = "sounds/tokens/token_disappear";
	
	public static var SOUND_TMNT_LOW_HEALTH:String = "sounds/low_health";
	public static var SOUND_TMNT_ATTACK:String = "sounds/tmnt_attack";
	public static var SOUND_TMNT_ATTACK2:String = "sounds/tmnt_4attack";
	public static var SOUND_TMNT_JUMP:String = "sounds/tmnt_jump";
	public static var SOUND_TMNT_HEALTH:String = "sounds/tmnt_health";
	public static var SOUND_TMNT_FALL:String = "sounds/tmnt_land";
	
	public static var SOUND_TMNT_WEAPON_POSTFIX:String = "_wpn_attack";
	public static var SOUND_TMNT_WEAPON_FOLDER:String = "sounds/";
	
	public static var SOUND_PATH_ENEMY_EXPLOSION:String = "sounds/";
	public static var SOUND_ENEMY_APPEAR:String = "sounds/enm_appears";
	public static var SOUND_ENEMY_HITRECEIVE:String = "sounds/enm_hitReceive";
	public static var SOUND_ENEMY_COMBOATTACK_POSTFIX:String = "_comboAttack";
	public static var SOUND_ENEMY_COMBOATTACK_FOLDER:String = "sounds/";
	
	public static var SOUND_ENEMY_SPECIALATTACK_POSTFIX:String = "_specialAttack";
	public static var SOUND_ENEMY_SPECIALATTACK_FOLDER:String = "sounds/";
	/*
	public static var SOUND_ENEMIE_COMBOATTACK:Map<NDiTypeToken, String> = [
		NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER 			=> "sounds/enm_hitReceive",
		NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT 		=> new NDiVector2D(-50,10),
		NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG 			=> new NDiVector2D(-20,10),
		NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR 			=> new NDiVector2D(-20,10),
		NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED 		=> new NDiVector2D(-20,10),
		NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ 	=> new NDiVector2D(-20,10),
		NDiTypeEnemy.NDI_TYPE_ENEMY_SHREDDER 		=> new NDiVector2D(-20,10)
	];
	*/
	
	
	public static var ARRAY_SOUND_TOKENS:Array<String> = [
		"sounds/tokens/scale/token01",
		"sounds/tokens/scale/token02",
		"sounds/tokens/scale/token03",
		"sounds/tokens/scale/token04",
		"sounds/tokens/scale/token05",
		"sounds/tokens/scale/token06",
		"sounds/tokens/scale/token07",
		"sounds/tokens/scale/token08",
		"sounds/tokens/scale/token09",
		"sounds/tokens/scale/token10"
	];
	
	/*VARS TO SAVE*/
	public static var ARRAY_VARS_TO_SAVE:Array<NDiVarsToSave> = NDiVarsToSave.createAll();
	public static var ARRAY_VARS_INIT_VALUES:Array<Dynamic> = [
		0,
		0,
		0,
		true,
		true
	];
	
	
	
	
	/*BALANCING CONFIG*/
	public static var RANGE_ARRAY:Array<Int> =[
		0,
		4,
		8,
		13,
		19,
		24
	];
	
	public static var PERCENT_WEIGHT_ENEMY_ARRAY:Array < Map < NDiTypeEnemy, Float >> = 
	[
		[//Range 0			
			NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER 			=> 0.9,			//90%
			NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT 		=> 1.0,			//10%			
		],
		[//Range 1
			NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER 			=> 0.20,		//20%
			NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT 		=> 0.60,		//40%
			NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ 	=> 1.0,			//40%
		],		
		[//Range 2
			NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER 			=> 0.10,		//10%
			NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT 		=> 0.30,		//20%
			NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ 	=> 0.50,		//20%
			NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED 		=> 0.75,		//25%
			NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR 			=> 1.0,			//25%
		],
		[//Range 3
			NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER 			=> 0.10,		//10%
			NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT 		=> 0.20,		//10%
			NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ 	=> 0.30,		//10%
			NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED 		=> 0.55,		//25%
			NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR 			=> 0.70,		//25%
			NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG 			=> 1.0,			//20%
		],
		[//Range 4
			NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER 			=> 0.10,		//10%
			NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT 		=> 0.20,		//10%
			NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ 	=> 0.30,		//10%
			NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED 		=> 0.40,		//10%			
			NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR 			=> 0.70,		//30%
			NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG 			=> 1.0,			//30%
		],		
		[//Range 5
			NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER 			=> 0.10,		//10%
			NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT 		=> 0.20,		//10%
			NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ 	=> 0.30,		//10%
			NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED 		=> 0.40,		//10%
			NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR 			=> 0.55,		//15%			
			NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG 			=> 0.75,		//20%
			NDiTypeEnemy.NDI_TYPE_ENEMY_SHREDDER 		=> 1.0,			//25%
		],
		
		/*RANGE6++ Default*/
		[			
			NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER 			=> 0.10,		//10%
			NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT 		=> 0.25,		//15%
			NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ 	=> 0.40,		//15%
			NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED 		=> 0.55,		//15%
			NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR 			=> 0.70,		//15%
			NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG 			=> 0.85,		//15%
			NDiTypeEnemy.NDI_TYPE_ENEMY_SHREDDER 		=> 1.0,			//15%
			
		],
	];
	
	public static var CONFIG_VARS_ENEMY_ARRAY:Array < Map < NDiTypeEnemy, Map<String, Dynamic> >> = 
	[
		[//RANGE 0
			NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER 			=> ["hitPoints" => 50, "damage" => 10, "time" => 20, "param1" => 3],			
			NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT 		=> ["hitPoints" => 60, "damage" => 15, "time" => 15, "param1" => 0],			
		],
		[//RANGE 1
			NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER 			=> ["hitPoints"=>50, "damage"=>10, "time"=>20, "param1"=>3],
			NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT 		=> ["hitPoints"=>60, "damage"=>15, "time"=>15, "param1"=>0],
			NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ		=> ["hitPoints"=>70, "damage"=>15, "time"=>20, "param1"=>5],
		],
		[//RANGE 2
			NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER 			=> ["hitPoints" => 50, "damage" => 10, "time" => 20, "param1" => 4],			
			NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT 		=> ["hitPoints" => 60, "damage" => 15, "time" => 12, "param1" => 3],			
			NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ		=> ["hitPoints" => 70, "damage" => 15, "time" => 15, "param1" => 5],			
			NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED		=> ["hitPoints" => 70, "damage" => 15, "time" => 12, "param1" => 1, "param2" => 3],			
			NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR			=> ["hitPoints" => 70, "damage" => 15, "time" => 15],			
		],
		[//RANGE 3
			NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER 			=> ["hitPoints" => 50, "damage" => 10, "time" => 20, "param1" => 4],			
			NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT 		=> ["hitPoints" => 60, "damage" => 15, "time" => 12, "param1" => 3],			
			NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ		=> ["hitPoints" => 70, "damage" => 15, "time" => 15, "param1" => 7],			
			NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED		=> ["hitPoints" => 70, "damage" => 15, "time" => 12, "param1" => 2, "param2" => 3],			
			NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR			=> ["hitPoints" => 80, "damage" => 20, "time" => 15],			
			NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG			=> ["hitPoints" => 80, "damage" => 20, "time" => 15],
		],
		[//RANGE 4
			NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER 			=> ["hitPoints"=>50, "damage"=>10, "time"=>20, "param1"=>4],
			NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT 		=> ["hitPoints"=>60, "damage"=>15, "time"=>12, "param1"=>3],
			NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ		=> ["hitPoints"=>70, "damage"=>15, "time"=>15, "param1"=>7],
			NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED		=> ["hitPoints"=>70, "damage"=>15, "time"=>12, "param1"=>2, "param2"=>3],
			NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR			=> ["hitPoints"=>80, "damage"=>20, "time"=>15],
			NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG			=> ["hitPoints"=>100, "damage"=>15, "time"=>12],
		],
		[//RANGE 5
			NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER 			=> ["hitPoints"=>50, "damage"=>10, "time"=>10, "param1"=>4],
			NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT 		=> ["hitPoints"=>60, "damage"=>15, "time"=>10, "param1"=>2],
			NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ		=> ["hitPoints"=>70, "damage"=>15, "time"=>10, "param1"=>8],
			NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED		=> ["hitPoints"=>70, "damage"=>15, "time"=>10, "param1"=>2, "param2"=>3],
			NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR			=> ["hitPoints"=>80, "damage"=>20, "time"=>10],
			NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG			=> ["hitPoints"=>100, "damage"=>15, "time"=>10],
			NDiTypeEnemy.NDI_TYPE_ENEMY_SHREDDER		=> ["hitPoints"=>120, "damage"=>15, "time"=>8, "param1"=>3],
		],
		[//RANGE 6++
			NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER 			=> ["hitPoints"=>65, "damage"=>15, "time"=>7, "param1"=>5],
			NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT 		=> ["hitPoints"=>75, "damage"=>20, "time"=>7, "param1"=>3],
			NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ		=> ["hitPoints"=>80, "damage"=>20, "time"=>7, "param1"=>9],
			NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED		=> ["hitPoints"=>80, "damage"=>20, "time"=>7, "param1"=>2, "param2"=>4],
			NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR			=> ["hitPoints"=>90, "damage"=>30, "time"=>7],
			NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG			=> ["hitPoints"=>110, "damage"=>20, "time"=>7],
			NDiTypeEnemy.NDI_TYPE_ENEMY_SHREDDER		=> ["hitPoints"=>130, "damage"=>20, "time"=>7, "param1"=>4],
		],
		
	];
	
	
	public static var ARRAY_DEBUG_TOKENS:Array<NDiTypeToken> = [
	NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_SPLINTER, NDI_TYPE_TURTLE_RAPHAEL, NDI_TYPE_TURTLE_SPLINTER, NDI_TYPE_TURTLE_DONATELLO, NDI_TYPE_TURTLE_SPLINTER,
	NDI_TYPE_TURTLE_SPLINTER, NDI_TYPE_TURTLE_RAPHAEL, NDI_TYPE_TURTLE_SPLINTER, NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_SPLINTER, NDI_TYPE_TURTLE_LEONARDO,
	
	NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_SPLINTER, NDI_TYPE_TURTLE_RAPHAEL, NDI_TYPE_TURTLE_SPLINTER, NDI_TYPE_TURTLE_DONATELLO, NDI_TYPE_TURTLE_SPLINTER,
	NDI_TYPE_TURTLE_SPLINTER, NDI_TYPE_TURTLE_RAPHAEL, NDI_TYPE_TURTLE_SPLINTER, NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_SPLINTER, NDI_TYPE_TURTLE_LEONARDO,
	
	NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_SPLINTER, NDI_TYPE_TURTLE_RAPHAEL, NDI_TYPE_TURTLE_SPLINTER, NDI_TYPE_TURTLE_DONATELLO, NDI_TYPE_TURTLE_SPLINTER,
	NDI_TYPE_TURTLE_SPLINTER, NDI_TYPE_TURTLE_RAPHAEL, NDI_TYPE_TURTLE_SPLINTER, NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_SPLINTER, NDI_TYPE_TURTLE_LEONARDO,
	
	NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_SPLINTER, NDI_TYPE_TURTLE_RAPHAEL, NDI_TYPE_TURTLE_SPLINTER, NDI_TYPE_TURTLE_DONATELLO, NDI_TYPE_TURTLE_SPLINTER,
	NDI_TYPE_TURTLE_SPLINTER, NDI_TYPE_TURTLE_RAPHAEL, NDI_TYPE_TURTLE_SPLINTER, NDI_TYPE_TURTLE_MICHELANGELO, NDI_TYPE_TURTLE_SPLINTER, NDI_TYPE_TURTLE_LEONARDO,
	];

}
