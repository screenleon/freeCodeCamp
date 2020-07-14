import re

def arithmetic_arranger(problems, result_print=False):
      read_param = []
      calculate_number_length = []
      result = []
      if len(problems) > 5:
            return 'Error: Too many problems.'
      for problem in problems:
            split = problem.split(' ')
            if split[1] != '+' and split[1] != '-': 
                  return "Error: Operator must be '+' or '-'."
            if len(re.findall("[^0-9]", split[0])) > 0 or len(re.findall("[^0-9]", split[2])) > 0:
                  return "Error: Numbers must only contain digits."
            if len(split[0]) > 4 or len(split[2]) > 4:
                  return "Error: Numbers cannot be more than four digits."
            calculate_number_length.extend([max(len(split[0]), len(split[2]))])
            result.extend([eval(problem)])
            read_param.extend(split)

      first_number_string = ''
      for index in range(0, len(calculate_number_length)):
            clean_first_number = read_param[index * 3].rjust(calculate_number_length[index] + 2, ' ')
            if len(first_number_string) != 0:
                  first_number_string = first_number_string + '    ' + clean_first_number
            else:
                  first_number_string = clean_first_number

      second_number_string = ''
      for index in range(0, len(calculate_number_length)):
            clean_second_number = read_param[index * 3 + 1] + read_param[index * 3 + 2].rjust(calculate_number_length[index] + 1, ' ')
            if len(second_number_string) != 0:
                  second_number_string = second_number_string + '    ' + clean_second_number
            else:
                  second_number_string = clean_second_number

      split_string = ''
      for index in range(0, len(calculate_number_length)):
            clean_split_string = ''.rjust(calculate_number_length[index] + 2, '-')
            if len(split_string) != 0:
                  split_string = split_string + '    ' + clean_split_string
            else:
                  split_string = clean_split_string
      
      result_string = ''
      for index in range(0, len(calculate_number_length)):
            clean_result_string = str(result[index]).rjust(calculate_number_length[index] + 2, ' ')
            if len(result_string) != 0:
                  result_string = result_string + '    ' + clean_result_string
            else:
                  result_string = clean_result_string

      arranged_problems = first_number_string + '\n' + second_number_string + '\n' + split_string
      # return first_number_string + '\n' + second_number_string + '\n'
      if result_print:
            return arranged_problems + '\n' + result_string
      else:
            return arranged_problems
