## Episode in Trace
<!-- Introcduction -->
This section provides an overview of the definitions and properties about episode mining.

### Episode
In data mining, an **episode** (also known as serial episode) is usually defined as a totally ordered set of events, and the frequency of an episode is the measure of how often it occurs in a sequence.

*Frequent episode mining (FEM)* techniques are broadly conducted to analyze data sequences in the domains of telecommunication, manufacturing, finance, biology, system log analysis and new analysis.
*FEM* aims at identifying all the frequent episodes whose frequencies are larger than a user-specified threshold.

Let's talk with an example with an event sequence of alarm systems:

![image](image/episode.png)

<p align="center"> A sequence of events </p>

One basic problem in analyzing event sequences is to find frequent episodes, i.e. a collection of events occuring frequently together.
When discovering episodes in a telecommunication network alarm log, the *goal* is to find relationships between alarms.
Such relationships can then be used in the on-line analysis of the incoming alarm stream, e.g., to better explain the problems that cause alarms, to suppress redundant alarms, and to predict servere faults.

### State-of-the-art
We are not aware of prior work on the problem of online *infrequent episode* mining. However, there are several studies related to this task, including frequent episode mining and online frequent pattern mining.

### Episode Trie
In [CTM](7.CTM.md) method, we use the an **episode trie** to identifying all the new minimal episode occurences.

Firstly, we  give the description of the data structure, which stores all minimal occurences in $M_i^j$. Remind that $M_i^j$ is the set of all minimal episode occurrences, starting at time $t_i$ and ending no later than $t_j$. 

A *episode trie* has the structure as following:

A **trie**, also called *prefix tree*, is an ordered tree data structure that is used to store a dynamic set where the keys are usually strings.
In a trie, all the descendants of a node have a common prefix of the string associated with that node, and the root is associated with the empty string.

In this study we ultilize the trie structure to store
