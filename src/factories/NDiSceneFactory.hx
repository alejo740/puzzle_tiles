package factories;
import globals.NDiGameConstants.NDiTypeScene;
import scenes.NDiAbstractScene;
import scenes.NDiCreditsScene;
import scenes.NDiGamePlayScene;
import scenes.NDiIntroScene;
import scenes.NDiMainMenuScene;
import scenes.NDiSplashNDiScene;
import scenes.NDiSplashNickelodeonScene;
import scenes.NDiTestScene;
import scenes.NDiTutorialScene;

/**
 * NDiTeravision
 * @author Edwin Cobos
 */
class NDiSceneFactory
{

	public static function createScene(sceneType:NDiTypeScene):NDiAbstractScene
	{
		var newScene:NDiAbstractScene = null;
		if(sceneType == NDiTypeScene.NDI_TYPE_SCENE_TEST)
		{
			newScene = new NDiTestScene();
		}
		else if (sceneType == NDiTypeScene.NDI_TYPE_SCENE_MAINMENU)
		{
			newScene = new NDiMainMenuScene();
		}
		else if (sceneType == NDiTypeScene.NDI_TYPE_SCENE_GAMEPLAY)
		{
			newScene = new NDiGamePlayScene();
		}
		else if (sceneType == NDiTypeScene.NDI_TYPE_SCENE_SPLASH_NDI)
		{
			newScene = new NDiSplashNDiScene();
		}
		else if (sceneType == NDiTypeScene.NDI_TYPE_SCENE_SPLASH_NICKELODEON)
		{
			newScene = new NDiSplashNickelodeonScene();
		}
		else if (sceneType == NDiTypeScene.NDI_TYPE_SCENE_CREDITS)
		{
			newScene = new NDiCreditsScene();
		}
		else if (sceneType == NDiTypeScene.NDI_TYPE_SCENE_INTRO)
		{
			newScene = new NDiIntroScene();
		}
		else if (sceneType == NDiTypeScene.NDI_TYPE_SCENE_TUTORIAL)
		{
			newScene = new NDiTutorialScene();
		}
		return newScene;
	}
	
}