package factories;
import flambe.swf.Library;
import game_objects.enemies.NDiDogPoundEnemy;
import game_objects.enemies.NDiEnemy;
import game_objects.enemies.NDiFootBotEnemy;
import game_objects.enemies.NDiFootSoldierEnemy;
import game_objects.enemies.NDiKrangEnemy;
import game_objects.enemies.NDiMouserEnemy;
import game_objects.enemies.NDiShredderEnemy;
import game_objects.enemies.NDiSnakeWeedEnemy;
import game_objects.enemies.NDiSpiderBytezEnemy;
import globals.NDiGameConstants;
import globals.NDiGameConstants.NDiTypeEnemy;
import managers.NDiEnemyManager;

/**
 * ...
 * @author Edwin Cobos
 */
class NDiEnemyFactory
{
	
	public static function createEnemy(valueIndex:Int):NDiEnemy
	{
		var typeEnemy:NDiTypeEnemy = NDiGameConstants.ARRAY_ENUM_TYPE_ENEMIES[valueIndex+1];
		var newEnemy:NDiEnemy = null;
		if(typeEnemy == NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER)
		//if(typeEnemy == NDiTypeEnemy.NDI_TYPE_ENEMY_NONE)
		{
			newEnemy = new NDiMouserEnemy(valueIndex);
		}/*
		else if(typeEnemy == NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTSOLDIER)
		{
			newEnemy = new NDiFootSoldierEnemy(lib);
		}
		*/
		else if(typeEnemy == NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT)
		{
			newEnemy = new NDiFootBotEnemy(valueIndex);
		}
		else if(typeEnemy == NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG)
		//else if(typeEnemy == NDiTypeEnemy.NDI_TYPE_ENEMY_NONE)
		{
			newEnemy = new NDiKrangEnemy(valueIndex);
		}
		else if(typeEnemy == NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR)
		//else if(typeEnemy == NDiTypeEnemy.NDI_TYPE_ENEMY_NONE)
		{
			newEnemy = new NDiDogPoundEnemy(valueIndex);
		}
		else if(typeEnemy == NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED)
		//else if(typeEnemy == NDiTypeEnemy.NDI_TYPE_ENEMY_NONE)
		{
			newEnemy = new NDiSnakeWeedEnemy(valueIndex);
		}
		else if(typeEnemy == NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ)
		//else if(typeEnemy == NDiTypeEnemy.NDI_TYPE_ENEMY_NONE)
		{
			newEnemy = new NDiSpiderBytezEnemy(valueIndex);
		}
		else if(typeEnemy == NDiTypeEnemy.NDI_TYPE_ENEMY_SHREDDER)
		//else if(typeEnemy == NDiTypeEnemy.NDI_TYPE_ENEMY_NONE)
		{
			newEnemy = new NDiShredderEnemy(valueIndex);
		}
		
		return newEnemy;
	}
	
}