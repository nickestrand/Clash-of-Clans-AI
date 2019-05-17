from __future__ import print_function
import matplotlib.pyplot as plt

import board
import main


class AStarGraph(object):
    # Define a class board like grid with two barriers

    def __init__(self, game_board):
        self.barriers = []
        self._game_board = game_board

        for building in game_board.get_buildings():
            if building.get_name() == "wall":
                self.barriers.append(building.get_pos())

    def heuristic(self, start, goal):
        return 0
        # Use Chebyshev distance heuristic if we can move one square either
        # adjacent or diagonal
        D = 1
        D2 = 1
        dx = abs(start[0] - goal[0])
        dy = abs(start[1] - goal[1])
        return D * (dx + dy) + (D2 - 2 * D) * min(dx, dy)

    def get_vertex_neighbours(self, pos):
        n = []
        # Moves allow link a chess king
        for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
            x2 = pos[0] + dx
            y2 = pos[1] + dy
            if x2 < 0 or x2 > 15 or y2 < 0 or y2 > 15 or (x2, y2) in self.barriers:
                continue
            n.append((x2, y2))
        return n

    def move_cost(self, a, b):
        for barrier in self.barriers:
            if b in barrier:
                return 10000  # Extremely high cost to enter barrier squares
        return 1  # Normal movement cost


def AStarSearch(start, targets, graph):
    G = {}  # Actual movement cost to each position from the start position
    F = {}  # Estimated movement cost of start to end going via this position

    # Initialize starting values
    G[start] = 0
    F[start] = graph.heuristic(start, targets)

    closedVertices = set()
    openVertices = set([start])
    cameFrom = {}

    while len(openVertices) > 0:
        # Get the vertex in the open list with the lowest F score
        current = None
        currentFscore = None
        for pos in openVertices:
            if current is None or F[pos] < currentFscore:
                currentFscore = F[pos]
                current = pos

        # Check if we have reached the goal
        if current in targets:
            # Retrace our route backward
            path = [current]
            while current in cameFrom:
                current = cameFrom[current]
                path.append(current)
            path.reverse()
            return path, F[current]  # Done!

        # Mark the current vertex as closed
        openVertices.remove(current)
        closedVertices.add(current)

        # Update scores for vertices near the current position
        for neighbour in graph.get_vertex_neighbours(current):
            if neighbour in closedVertices:
                continue  # We have already processed this node exhaustively
            candidateG = G[current] + graph.move_cost(current, neighbour)

            if neighbour not in openVertices:
                openVertices.add(neighbour)  # Discovered a new vertex
            elif candidateG >= G[neighbour]:
                continue  # This G score is worse than previously found

            # Adopt this G score
            cameFrom[neighbour] = current
            G[neighbour] = candidateG
            H = graph.heuristic(neighbour, targets)
            F[neighbour] = G[neighbour] + H

    print("A* failed to find a solution")
    return [], 0


def viz_path(result, graph, targets):
    for point in result:
        circle = plt.Circle(point, 0.2, color='r')
        plt.gcf().gca().add_artist(circle)

    for barrier in graph.barriers:
        circle = plt.Circle(barrier, 0.2)
        plt.gcf().gca().add_artist(circle)

    for target in targets:
        circle = plt.Circle(target, 0.2, color='g')
        plt.gcf().gca().add_artist(circle)

    plt.xlim(-1, 15)
    plt.ylim(-1, 15)
    plt.show()


if __name__ == "__main__":
    gb = board.GameBoard(main.generate_random_base_3())
    graph = AStarGraph(gb)
    print(graph.barriers)
    start = (0, 0)
    targets = [(1, 7), (7, 7), (7, 1)]
    result, cost = AStarSearch(start, targets, graph)
    viz_path(result, graph, targets)