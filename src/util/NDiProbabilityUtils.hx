package util;
import globals.NDiGameConstants;
import globals.NDiGameConstants.NDiTypeToken;

/**
 * NDiTeravision
 * @author Edwin Cobos
 */
class NDiProbabilityUtils
{	
	private static function isFiltered(value:NDiTypeToken, filter:Array<NDiTypeToken>):Bool
	{
		//var isFiltered:Bool = false;
		for (index2 in 0...filter.length)
		{
			if (filter[index2] == value)
			{
				return true;
				break;
			}
		}
		return false;
	}
	
	public static function convertRangeToPercent(probabilities:Map<NDiTypeToken, Float>):Map<NDiTypeToken, Float>
	{
		var newMap:Map<NDiTypeToken, Float> = new Map<NDiTypeToken, Float>();
		var prevValue:Float = 0;
		for (index in 1...NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN.length)
		{
			var value:Float = probabilities.get(NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index]);
			var setValue:Float = value;
			if (index > 1)
			{
				setValue = value - prevValue;
			}
			setValue = setValue < 0 ? 0 : setValue;
			newMap.set(NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index], setValue);
			prevValue = value;
		}
		
		return newMap;
	}
	
	public static function createModifiedProbability(probabilities:Map<NDiTypeToken, Float>, filter:NDiTypeToken, newProbability:Float):Map<NDiTypeToken, Float>
	{
		var remaining:Float = 1 - newProbability;
		var factor:Float = remaining / (1 - probabilities.get(filter));
		
		var newMap:Map<NDiTypeToken, Float> = new Map<NDiTypeToken, Float>();
		var prevValue:Float = 0;
		for (index in 1...NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN.length)
		{
			var value:Float = probabilities.get(NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index]);			
			
			if (NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index] == filter)
			{
				value = newProbability;
			}else {				
				value = value * factor;
			}
			
			if (index > 1)
			{
				value = prevValue + value;
			}
			value = value < 0 ? 0 : value;
			newMap.set(NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index], value);
			prevValue = value;
			
		}
		
		return newMap;
	}
	
	public static function createFilteredProbability(probabilities:Map<NDiTypeToken, Float>, filter:Array<NDiTypeToken>):Map<NDiTypeToken, Float>
	{		
		var inc:Float = 0;
		for (index in 0...filter.length)
		{
			inc += probabilities.get(filter[index]);
		}
		inc = inc / ((NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN.length - 1) - filter.length);		
		
		
		var newMap:Map<NDiTypeToken, Float> = new Map<NDiTypeToken, Float>();
		var prevValue:Float = 0;
		for (index in 1...NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN.length)
		{
			var isFiltered:Bool = NDiProbabilityUtils.isFiltered(NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index], filter);
			
			if (isFiltered)
			{
				newMap.set(NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index], 0);
			}else {
				var value:Float = probabilities.get(NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index]);
				if (index > 1)
				{
					value = prevValue + value;
				}
				value += inc;
				value = value < 0 ? 0 : value;
				newMap.set(NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index], value);
				prevValue = value;
			}
		}		
		return newMap;		
	}
	
	public static function createNormalProbabilities(probabilities:Map<NDiTypeToken, Float>):Map<NDiTypeToken, Float>
	{
		var newMap:Map<NDiTypeToken, Float> = new Map<NDiTypeToken, Float>();
		var prevValue:Float = 0;
		for (index in 1...NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN.length)
		{
			var value:Float = probabilities.get(NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index]);
			if (index > 1)
			{				
				value = prevValue + value;
			}
			value = value < 0 ? 0 : value;
			newMap.set(NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index], value);
			prevValue = value;			
		}		
		return newMap;
	}
	
	public static function cloneMap_(map:Map<NDiTypeToken, Dynamic>):Map<NDiTypeToken, Dynamic>
	{	
		var newMap:Map<NDiTypeToken, Dynamic> = new Map<NDiTypeToken, Dynamic>();
		var it:Iterator<NDiTypeToken> = map.keys();
		for (key in it)
		{
			var value:Float = map.get(key);
			newMap.set(key, value);
		}
		
		return newMap;
	}
}