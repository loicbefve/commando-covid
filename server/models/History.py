import copy

class History:
    def __init__(self):
        self.sorted_history = []

    def store(self,state):
        self.sorted_history.append(copy.deepcopy(state))

    def get_states(self,time):
        return [state for state in self.sorted_history if state.time == time]

    def get_last_state(self,time):
        states = self.get_states(time)
        if len(states) > 0:
            return states[-1]
        return None
