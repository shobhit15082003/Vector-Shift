from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Set

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Ping": "Pong"}

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    if not nodes:
        return True
        
   
    graph: Dict[str, Set[str]] = {node["id"]: set() for node in nodes}
    indegree: Dict[str, int] = {node["id"]: 0 for node in nodes}

    for edge in edges:
        source = edge["source"]
        target = edge["target"]
    
        if source in graph and target in graph:
            graph[source].add(target)
            indegree[target] += 1

    queue = [node_id for node_id in graph if indegree[node_id] == 0]
    visited = 0

    while queue:
        current = queue.pop(0)
        visited += 1
        for neighbor in graph[current]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(nodes)

@app.post("/pipelines/parse")
async def parse_pipeline(request: Request):
    data = await request.json()
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])
    
    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": is_dag(nodes, edges)
    }