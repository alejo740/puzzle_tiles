package globals;

import managers.NDiResourcesManager;
import globals.NDiGameConstants;
import haxe.xml.Fast;

class NDiGameGlobals
{
    // Debug variables.
    public var bCycleEnemies:Bool;

    // Activators.
    public var bHighScores:Bool;
    public var bNickPoints:Bool;
    public var bUniversalEndGameScreen:Bool;
    public var bAchievements:Bool;

	public var currentScaleGame:Float;
	public var isRightHanded:Bool;
	
	private static var instance:NDiGameGlobals;
	
    private function new()
    {
        this.bCycleEnemies = false;

        this.bHighScores = false;
        this.bNickPoints = false;
        this.bUniversalEndGameScreen = false;
        this.bAchievements = false;

		this.currentScaleGame = 1;
		this.isRightHanded = true;
    }
    
    public function initGlobalConfigData():Void
    {
        var sXML:String = NDiResourcesManager.getInstance().loadXML(NDiGameConstants.ASSET_PACKAGE_CONFIG, 
                                                                    NDiGameConstants.CONFIG_ASSET_CONFIG_XML);
        
        var oXML = new Fast(Xml.parse(sXML).firstElement());

        for(debugNode in oXML.nodes.debug)
        {
            this.bCycleEnemies = debugNode.node.cycle_enemies.innerData == "enabled" ? true : false;
        }

        for(debugNode in oXML.nodes.activators)
        {
            this.bHighScores = debugNode.node.high_scores.innerData == "enabled" ? true : false;
            //this.bNickPoints = debugNode.node.nick_points.innerData == "enabled" ? true : false;
            this.bUniversalEndGameScreen = debugNode.node.universal_end_game_screen.innerData == "enabled" ? true : false;
            this.bAchievements = debugNode.node.achievements.innerData == "enabled" ? true : false;
        }
    }

    public static function initInstance():Void
    {
    	if(NDiGameGlobals.instance == null)
    	{
    		NDiGameGlobals.instance = new NDiGameGlobals();
    	}
    }
    
    public static function getInstance():NDiGameGlobals
    {
    	return NDiGameGlobals.instance;
    }
}
