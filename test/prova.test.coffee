test "Colors & palette", 11, () -> 

	string2Value = "#{JSON.stringify palette[0]}"
	evalExpression = "palette[0]" + " => " + string2Value
	result = "[0.5,0,0]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify palette[0] is MAROON}"
	evalExpression = "palette[0] is MAROON" + " => " + string2Value
	result = "true"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify palette[15]}"
	evalExpression = "palette[15]" + " => " + string2Value
	result = "[0.5,0,0.5]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify palette[15] is PURPLE}"
	evalExpression = "palette[15] is PURPLE" + " => " + string2Value
	result = "true"
	same string2Value, result, evalExpression

	string2Value = "#{d2h 100}"
	evalExpression = "d2h 100" + " => " + string2Value
	result = "2s"
	same string2Value, result, evalExpression

	string2Value = "#{d2h 36}"
	evalExpression = "d2h 36" + " => " + string2Value
	result = "10"
	same string2Value, result, evalExpression

	string2Value = "#{d2h 35}"
	evalExpression = "d2h 35" + " => " + string2Value
	result = "z"
	same string2Value, result, evalExpression

	string2Value = "#{d2h(11111111111)}"
	evalExpression = "d2h 11111111111" + " => " + string2Value
	result = "53r9o7b"
	same string2Value, result, evalExpression

	string2Value = "#{h2d '10'}"
	evalExpression = "h2d 10" + " => " + string2Value
	result = "36"
	same string2Value, result, evalExpression

	string2Value = "#{h2d 'z'}"
	evalExpression = "h2d z" + " => " + string2Value
	result = "35"
	same string2Value, result, evalExpression

	string2Value = "#{h2d '53r9o7b'}"
	evalExpression = "h2d 53r9o7b" + " => " + string2Value
	result = "11111111111"
	same string2Value, result, evalExpression
